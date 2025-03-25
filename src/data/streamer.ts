import { configStore } from "config/store";
import { DataError } from "errors/factory";
import { ERROR_MESSAGES } from "errors/messages";
import { createReadStream } from "fs";
import type {Readable} from "stream";

/**
 * DataStreamer Class
 */
export class DataStreamer {

  private _chunkSize: number;

  /**
   * Initialize the DataStreamer class
   * @description This class is responsible for streaming data from a file or a URL. It checks if the file or URL can be streamed based on its size and manages the buffer for streaming.
   */
  constructor() {
    // Initialize the default values
    this._chunkSize = configStore.get().dataStreaming.chunkSize;
  }

  /**
   * Create a readable stream from a file path
   * @param {string} filePath The file path to the JSON data
   * @description This method will create a readable stream from the file path. It will check if the file exists.
   * @returns {Readable} The readable stream of the JSON data
   */
  public createFileStream(filePath: string): Readable {
    // Update the chunk size from config
    this._chunkSize = configStore.get().dataStreaming.chunkSize;

    // Create the file stream
    const stream = createReadStream(filePath, {
      highWaterMark: this._chunkSize,
      encoding: "utf-8",
    });

    // Handle errors
    stream.on("error", (error) => {
      throw new DataError(ERROR_MESSAGES.DATA.ERR_FILE_STREAM, error);
    });

    return stream;
  }

}

export const dataStreamer = new DataStreamer();
