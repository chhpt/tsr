import { TransformOptions, TransformResult } from 'esbuild';
/**
 * transform typescript to javascript
 */
export declare const compile: (code: string, filename: string, options?: Partial<TransformOptions>) => TransformResult;
