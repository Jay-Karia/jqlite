/**
 * @fileoverview Error types for jqlite.
 * @author Jay-Karia
 */

"use strict";

//======================================TYPES====================================

export type ErrorParams = {
  message: string;
  code: string;
  cause: string;
  solution?: string;
};

//=================================================================================
