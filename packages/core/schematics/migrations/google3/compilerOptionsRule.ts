/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {Replacement, RuleFailure, Rules} from 'tslint';
import ts from 'typescript';

import {migrateFile} from '../compiler-options/util';

/** TSLint rule for the CompilerOptions migration. */
export class Rule extends Rules.TypedRule {
  override applyWithProgram(sourceFile: ts.SourceFile, program: ts.Program): RuleFailure[] {
    const failures: RuleFailure[] = [];

    const rewriter = (startPos: number, origLength: number, text: string) => {
      const failure = new RuleFailure(
          sourceFile, startPos, startPos + origLength,
          'CompilerOptions.useJit and CompilerOptions.missingTranslation are being removed.',
          this.ruleName, new Replacement(startPos, origLength, text));
      failures.push(failure);
    };

    migrateFile(sourceFile, rewriter);

    return failures;
  }
}
