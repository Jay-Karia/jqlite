import { expect, test } from 'vitest'
import {JQLite} from "../src/index"

const jqlite = new JQLite();

test('adds 1 + 2 to equal 3', () => {
  expect(jqlite.config.get()).toBeTypeOf("object")
})