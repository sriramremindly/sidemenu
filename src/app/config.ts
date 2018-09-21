import {InjectionToken} from '@angular/core';
import {environment} from '../environment/environment';
export const urlName = new InjectionToken<string>('url-name');
export const sampleNameEnv = { provide:urlName, useValue:environment.restApiUrl};