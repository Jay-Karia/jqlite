import { configStore } from "config/store";
import { DataError } from "errors/factory";
import { ERROR_MESSAGES } from "errors/messages";
import { createReadStream, existsSync, statSync } from "fs";
import { isValidUrl } from "./utils";
import { dataManager } from "./manager";

/**
 * DataStreamer Class
 */
export class DataStreamer {
  private _buffer: Buffer;
  private _memoryStream: Buffer;

  private readonly _chunkSize: number;
  private _bufferSize: number;
  private _dataSize: number;

  /**
   * Initialize the DataStreamer class
   * @description This class is responsible for streaming data from a file or a URL. It checks if the file or URL can be streamed based on its size and manages the buffer for streaming.
   */
  constructor() {
    // Initialize the default values
    this._chunkSize = configStore.get().dataStreaming.chunkSize;
    this._dataSize = configStore.get().dataStreaming.dataSize;
    this._bufferSize = configStore.get().dataStreaming.bufferSize;

    // Initialize the buffer and memory stream
    this._buffer = Buffer.alloc(0);
    this._memoryStream = Buffer.alloc(0);
  }

  /**
   * Stream the data from a file
   * @param {string} filePath The path to the file
   * @description This method reads the file data in stream and writes the data into memory stream, and at the end of the stream, it will update the data in data store
   */
  public streamFile(filePath: string): Promise<string> {
    return new Promise((resolve, reject) => {
      // Check for file validity
      if (!existsSync(filePath)) {
        return reject(
          new DataError(ERROR_MESSAGES.DATA.INVALID_FILE_PATH, { filePath })
        );
      }

      // Create a read stream
      const fileStream = createReadStream(filePath, {
        highWaterMark: this._chunkSize,
      });

      // Read in chunks and add to buffer
      fileStream.on("data", (chunk: string | Buffer) => {
        this.addToBuffer(chunk);
      });

      // On stream end, flush buffer and update data store
      fileStream.on("end", () => {
        this.flush();

        // Convert buffer to string and update data store
        const streamedData = this._memoryStream.toString("utf-8");
        dataManager.set(streamedData);

        resolve(streamedData);
      });

      // Handle errors
      fileStream.on("error", (err) => reject(err));
    });
  }

  /**
   * Check whether the file can be streamed
   * @param {string} filePath The path to the file
   * @description This method checks if the file can be streamed based on its size.
   * @returns {boolean} True if the file can be streamed, false otherwise
   */
  public canStreamFile(filePath: string): boolean {
    // Check if data streaming is enabled
    const isAutoStreamingEnabled = configStore.get().dataStreaming.autoStream;
    if (!isAutoStreamingEnabled) return false;

    // Get the minimum data size from the config
    this._dataSize = configStore.get().dataStreaming.dataSize;

    // Check if the file exists
    const isFile = existsSync(filePath);
    if (!isFile)
      throw new DataError(ERROR_MESSAGES.DATA.INVALID_FILE_PATH, {
        filePath,
        isFile,
      });

    // Get the file size
    try {
      const fileStats = statSync(filePath);
      return fileStats.size > this._dataSize;
    } catch (error) {
      throw new DataError(ERROR_MESSAGES.DATA.ERR_EVALUATING_FILE_STATS, {
        error,
      });
    }
  }

  /**
   * Add data to the buffer
   * @description This method adds data to the buffer. If the buffer is full, it will throw an error.
   * @param {string | Buffer} chunk The data to add to the buffer
   */
  public addToBuffer(chunk: string | Buffer): void {
    // Convert string to buffer
    if (typeof chunk === "string") chunk = Buffer.from(chunk);

    // Update buffer size from config
    this._bufferSize = configStore.get().dataStreaming.bufferSize;

    // Check if the chunk is larger than remaining space
    const remainingSpace = this._bufferSize - this._buffer.byteLength;
    if (chunk.byteLength > remainingSpace) this.flush();

    // Add the chunk to the buffer
    this._buffer = Buffer.concat([this._buffer, chunk]);
  }

  /**
   * Flush the buffer
   * @description This method flushes the buffer and writes the data to memory stream.
   */
  public flush(): void {
    this._memoryStream = Buffer.concat([this._memoryStream, this._buffer]);
    this._buffer = Buffer.alloc(0);
  }
}

export const dataStreamer = new DataStreamer();
