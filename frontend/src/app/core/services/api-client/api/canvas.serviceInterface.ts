/**
 * FastAPI
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 0.1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { HttpHeaders }                                       from '@angular/common/http';

import { Observable }                                        from 'rxjs';

import { BmcEntry } from '../model/models';
import { Canvas } from '../model/models';
import { CreateCanvasRequest } from '../model/models';
import { CreateEntryRequest } from '../model/models';
import { FullCanvas } from '../model/models';
import { HTTPValidationError } from '../model/models';
import { UpdateEntryRequest } from '../model/models';


import { Configuration }                                     from '../configuration';



export interface CanvasServiceInterface {
    defaultHeaders: HttpHeaders;
    configuration: Configuration;

    /**
     * Create Canvas
     * Creates a new canvas under the name of the user.
     * @param createCanvasRequest 
     */
    createCanvasApiCanvasPost(createCanvasRequest: CreateCanvasRequest, extraHttpRequestParams?: any): Observable<Canvas>;

    /**
     * Get Canvas
     * Returns the full canvas, with info and entries.
     * @param canvasId 
     */
    getCanvasApiCanvasCanvasIdGet(canvasId: string, extraHttpRequestParams?: any): Observable<FullCanvas>;

    /**
     * Get Canvas Entries
     * Returns all canvas entries for the canvas if the user can access it.
     * @param canvasId 
     */
    getCanvasEntriesApiCanvasCanvasIdEntriesGet(canvasId: string, extraHttpRequestParams?: any): Observable<Array<BmcEntry>>;

    /**
     * Get User Canvases
     * Returns all canvases a user has created.
     */
    getUserCanvasesApiUserCanvasesGet(extraHttpRequestParams?: any): Observable<Array<Canvas>>;

    /**
     * Post Canvas Entry
     * Creates a new entry in the given canvas, if the user can access it.
     * @param canvasId 
     * @param createEntryRequest 
     */
    postCanvasEntryApiCanvasCanvasIdEntriesPost(canvasId: string, createEntryRequest: CreateEntryRequest, extraHttpRequestParams?: any): Observable<BmcEntry>;

    /**
     * Put Canvas Entry
     * Creates a new entry in the given canvas, if the user can access it.
     * @param canvasId 
     * @param updateEntryRequest 
     */
    putCanvasEntryApiCanvasCanvasIdEntriesPut(canvasId: string, updateEntryRequest: UpdateEntryRequest, extraHttpRequestParams?: any): Observable<BmcEntry>;

}
