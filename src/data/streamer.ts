import { loadDefaultConfig } from "config/loader";
import { configStore } from "config/store";
import { DataError } from "errors/factory";
import { ERROR_MESSAGES } from "errors/messages";
import { existsSync, statSync } from "fs";
import { isValidUrl } from "./utils";

/**
 * DataStreamer Class
 */
export class DataStreamer {
  private _buffer: Buffer;
  private _chunk: Buffer;

  private _chunkSize: number;
  private _bufferSize: number;
  private _minDataSize: number;

  private _defaultConfig = loadDefaultConfig();

  constructor() {
    // Initialize the buffer and chunk
    this._buffer = Buffer.alloc(0);
    this._chunk = Buffer.alloc(0);

    // Initialize the default chunk size, buffer size and min data size
    this._chunkSize = this._defaultConfig.dataStreaming.chunkSize;
    this._bufferSize = this._defaultConfig.dataStreaming.bufferSize;
    this._minDataSize = this._defaultConfig.dataStreaming.minDataSize;
  }

  /**
   * Check whether the file can be streamed
   * @param {string} filePath The path to the file
   * @description This method checks if the file can be streamed based on its size.
   * @returns {boolean} True if the file can be streamed, false otherwise
   */
  public canStreamFile(filePath: string): boolean {
    // Check if data streaming is enabled
    const isDataStreamingEnabled = configStore.get().dataStreaming.enabled;
    if (!isDataStreamingEnabled) return false;

    // Get the minimum data size from the config
    this._minDataSize = configStore.get().dataStreaming.minDataSize;

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
      return fileStats.size > this._minDataSize;
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
    const isDataStreamingEnabled = configStore.get().dataStreaming.enabled;
    if (!isDataStreamingEnabled) return false;

    // Get the minimum data size from the config
    this._minDataSize = configStore.get().dataStreaming.minDataSize;

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

      return parseInt(contentLength) > this._minDataSize;
    } catch (error) {
      throw new DataError(ERROR_MESSAGES.DATA.ERR_EVALUATING_URL_STATS, {
        error,
      });
    }
  }
}

export const dataStreamer = new DataStreamer();
