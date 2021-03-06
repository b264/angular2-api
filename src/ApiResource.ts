import {RequestOptionsArgs} from '@angular/http'

export interface ApiResource {
  idAttribute?: string
  endpoint: string
 
  deserialize?(data: any): any
  serialize?(data: any): any
  serializeParams?(params: RequestOptionsArgs): any
}
