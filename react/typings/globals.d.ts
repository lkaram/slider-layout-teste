import { FunctionComponent } from 'react'

declare global {
  interface StorefrontFunctionComponent<P = {}> extends FunctionComponent<P> {
    schema?: object
    getSchema?(props?: P): object
  }

  interface SliderLayoutSiteEditorProps {
    infinite: boolean
    showNavigationArrows: 'mobileOnly' | 'desktopOnly' | 'always' | 'never'
    showPaginationDots: 'mobileOnly' | 'desktopOnly' | 'always' | 'never'
    usePagination: boolean
  }

  interface SliderLayoutProps {
    totalItems?: number
    label: string
    slideTransition: {
      /** Transition speed in ms */
      speed: number
      /** Transition delay in ms */
      delay: number
      timing: string
    }
    autoplay?: {
      /** Timeout duration in ms */
      timeout: number
      stopOnHover?: boolean
    }
    navigationStep: number | 'page'
    itemsPerPage: {
      desktop: number
      tablet: number
      phone: number
    }
  }
}
