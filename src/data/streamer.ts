import {loadDefaultConfig} from "config/loader";
import {configStore} from "config/store";
import {DataError} from "errors/factory";
import {ERROR_MESSAGES} from "errors/messages";
import {existsSync, statfsSync} from "fs";

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
    // Get the minimum data size from the config
    this._minDataSize = configStore.get().dataStreaming?.minDataSize || this._defaultConfig.dataStreaming.minDataSize;

    // Check if the file exists
    const isFile = existsSync(filePath);
    if (!isFile) throw new DataError(ERROR_MESSAGES.DATA.INVALID_FILE_PATH, {
      filePath,
      isFile
    });

    // Get the file size
    const fileSize = statfsSync(filePath).bsize;
    return fileSize > this._minDataSize;
  }

}

export const dataStreamer = new DataStreamer();
