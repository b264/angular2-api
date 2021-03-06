import {Injectable, Optional} from '@angular/core'
import {RequestOptionsArgs} from '@angular/http'

export interface ApiConfigArgs {
  basePath: string
  deserialize?: ((data: any|any[]) => any|any[])
  serialize?: ((data: any|any[]) => any|any[])
  serializeParams?: ((params: RequestOptionsArgs) => RequestOptionsArgs)
}

@Injectable()
export abstract class AbstractApiConfig {
  public basePath: string
  abstract deserialize(data: any|any[]): any|any[] 
  abstract serialize(data: any|any[]): any|any[]
  abstract serializeParams(params: RequestOptionsArgs): RequestOptionsArgs
}

@Injectable()
export class ApiConfig implements AbstractApiConfig {
  public basePath: string

  constructor(@Optional() {basePath, deserialize, serialize, serializeParams}: ApiConfigArgs) {
    this.basePath = basePath

    if (deserialize)
      this.deserialize = deserialize

    if (serialize)
      this.serialize = serialize

    if (serializeParams)
      this.serializeParams = serializeParams
  }

  public deserialize(data: any|any[]): any|any[] {
    return data
  }

  public serialize(data: any|any[]): any|any[] {
    return data
  }

  public serializeParams(params: RequestOptionsArgs): RequestOptionsArgs {
    return params
  }
}
