/* eslint-disable @typescript-eslint/no-explicit-any */
import envConfig from '@/config'
import { normalizePath } from '@/lib/utils'
import { LoginResType } from '@/schemaValidations/auth.schema'
import { redirect } from 'next/navigation'

type CustomOptions = Omit<RequestInit, 'method'> & {
  baseUrl?: string | undefined
}

const ENTITY_ERROR_STATUS = 422
const AUTHENTICATION_ERROR_STATUS = 401

type EntityErrorPayload = {
  message: string
  errors: {
    field: string
    message: string
  }[]
}

export class HttpError extends Error {
  status: number
  payload: {
    message: string
    [key: string]: any
  }
  constructor({ status, payload, message = 'Lỗi HTTP' }: { status: number; payload: any; message?: string }) {
    super(message)
    this.status = status
    this.payload = payload
  }
}

export class EntityError extends HttpError {
  status: typeof ENTITY_ERROR_STATUS
  payload: EntityErrorPayload
  constructor({ status, payload }: { status: typeof ENTITY_ERROR_STATUS; payload: EntityErrorPayload }) {
    super({ status, payload, message: 'Lỗi thực thể' })
    this.status = status
    this.payload = payload
  }
}

let clientLogoutRequest: null | Promise<any> = null
const isClient = typeof window !== 'undefined'
const request = async <Response>(
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
  url: string,
  options?: CustomOptions | undefined
) => {
  let body: FormData | string | undefined = undefined
  if (options?.body instanceof FormData) {
    body = options.body
  } else if (options?.body) {
    body = JSON.stringify(options.body)
  }
  const baseHeaders: {
    [key: string]: string
  } =
    body instanceof FormData
      ? {}
      : {
          'Content-Type': 'application/json'
        }
  if (isClient) {
    const accessToken = localStorage.getItem('accessToken')
    if (accessToken) {
      baseHeaders.Authorization = `Bearer ${accessToken}`
    }
  }
  // If baseUrl is not passed (or baseUrl = undefined) then get it from envConfig.NEXT_PUBLIC_API_END_POINT
  // If baseUrl is passed then get the passed value, passing '' means we are calling the API to Next.js Server
  const baseUrl = options?.baseUrl === undefined ? envConfig.NEXT_PUBLIC_API_END_POINT : options.baseUrl

  const fullUrl = `${baseUrl}/${normalizePath(url)}`
  const res = await fetch(fullUrl, {
    ...options,
    headers: {
      ...baseHeaders,
      ...options?.headers
    } as any,
    body,
    method
  })
  const payload: Response = await res.json()
  const data = {
    status: res.status,
    payload
  }
  // Interceptor is where we process the request and response before returning it to the component side
  if (!res.ok) {
    if (res.status === ENTITY_ERROR_STATUS) {
      throw new EntityError(
        data as {
          status: 422
          payload: EntityErrorPayload
        }
      )
    } else if (res.status === AUTHENTICATION_ERROR_STATUS) {
      if (isClient) {
        if (!clientLogoutRequest) {
          clientLogoutRequest = fetch('/api/auth/logout', {
            method: 'POST',
            body: null, // Logout I will allow always success
            headers: {
              ...baseHeaders
            } as any
          })
          try {
            await clientLogoutRequest
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
          } catch (error) {
          } finally {
            localStorage.removeItem('accessToken')
            localStorage.removeItem('refreshToken')
            clientLogoutRequest = null
            // Redirect to login page can lead to infinite loop
            // If not handled properly
            // Because if we fall into the case at Login page, we call APIs that need access token
            // But the access token has been deleted, it will jump here again, and so it will loop
            location.href = '/login'
          }
        }
      } else {
        const accessToken = (options?.headers as any)?.Authorization.split('Bearer ')[1]
        redirect(`/logout?accessToken=${accessToken}`)
      }
    } else {
      throw new HttpError(data)
    }
  }
  // Make sure the logic below only runs on the client (browser) side
  if (isClient) {
    const normalizeUrl = normalizePath(url)
    if (normalizeUrl === 'api/auth/login') {
      const { accessToken, refreshToken } = (payload as LoginResType).data
      localStorage.setItem('accessToken', accessToken)
      localStorage.setItem('refreshToken', refreshToken)
    } else if (normalizeUrl === 'api/auth/logout') {
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
    }
  }
  return data
}

const http = {
  get<Response>(url: string, options?: Omit<CustomOptions, 'body'> | undefined) {
    return request<Response>('GET', url, options)
  },
  post<Response>(url: string, body: any, options?: Omit<CustomOptions, 'body'> | undefined) {
    return request<Response>('POST', url, { ...options, body })
  },
  put<Response>(url: string, body: any, options?: Omit<CustomOptions, 'body'> | undefined) {
    return request<Response>('PUT', url, { ...options, body })
  },
  patch<Response>(url: string, body: any, options?: Omit<CustomOptions, 'body'> | undefined) {
    return request<Response>('PATCH', url, { ...options, body })
  },
  delete<Response>(url: string, options?: Omit<CustomOptions, 'body'> | undefined) {
    return request<Response>('DELETE', url, { ...options })
  }
}

export default http
