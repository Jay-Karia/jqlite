import { configStore } from "config/store";
import { DataError } from "errors/factory";
import { ERROR_MESSAGES } from "errors/messages";
import { existsSync, statSync } from "fs";
import { isValidUrl } from "./utils";

/**
 * DataStreamer Class
 */
export class DataStreamer {

  private readonly _chunkSize: number;
  private readonly _bufferSize: number;
  private _dataSize: number;

  /**
   * Initialize the DataStreamer class
   * @description This class is responsible for streaming data from a file or a URL. It checks if the file or URL can be streamed based on its size and manages the buffer for streaming.
   */
  constructor() {
    // Initialize the default chunk size, buffer size and min data size
    this._chunkSize = configStore.get().dataStreaming.chunkSize;
    this._bufferSize = configStore.get().dataStreaming.bufferSize;
    this._dataSize = configStore.get().dataStreaming.dataSize;
  }

  /**
   * Flush the buffer to destination
   * @description This method flushes the buffer to the destination. It is called when the buffer is full or when the chunk is larger than the remaining space in the buffer.
   */
  public flush(): void {}

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
   * Check whether the url can be streamed
   * @param {string} url The url to check
   * @description This method checks if the url can be streamed based on its size.
   * @returns {boolean} True if the url can be streamed, false otherwise
   */
  public async canStreamUrl(url: string): Promise<boolean> {
    // Check if data streaming is enabled
    const canAutoStream = configStore.get().dataStreaming.autoStream;
    if (!canAutoStream) return false;

    // Get the minimum data size from the config
    this._dataSize = configStore.get().dataStreaming.dataSize;

    // Check if the url is valid
    const isUrl = isValidUrl(url);
    if (!isUrl)
      throw new DataError(ERROR_MESSAGES.DATA.INVALID_JSON_URL, { url });

    // Get the url size
    try {
      const response = await fetch(url);
      const contentLength = response.headers.get("content-length");

      // If the content length is not present, we cannot determine the size
      if (!contentLength) return false;

      return parseInt(contentLength) > this._dataSize;
    } catch (error) {
      throw new DataError(ERROR_MESSAGES.DATA.ERR_EVALUATING_URL_STATS, {
        error,
      });
    }
  }

}

export const dataStreamer = new DataStreamer();
