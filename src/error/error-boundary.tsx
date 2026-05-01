// components/ErrorBoundary.tsx
import React from 'react'

interface Props {
   children: React.ReactNode
   fallback?: React.ReactNode        // UI customizado
   onError?: (error: Error) => void // logging, Sentry, etc
}

interface State {
   hasError: boolean
   error: Error | null
}

export class ErrorBoundary extends React.Component<Props, State> {
   state: State = { hasError: false, error: null }

   static getDerivedStateFromError(error: Error): State {
      return { hasError: true, error }
   }

   componentDidCatch(error: Error, info: React.ErrorInfo) {
      this.props.onError?.(error)
      console.error('[ErrorBoundary]', error, info.componentStack)
   }

   reset = () => this.setState({ hasError: false, error: null })

   render() {
      if (this.state.hasError) {
         return this.props.fallback ?? (
            <DefaultFallback error={this.state.error} reset={this.reset} />
         )
      }
      return this.props.children
   }
}

function DefaultFallback({ error, reset }: { error: Error | null; reset: () => void }) {
   return (
      <div className="flex flex-col items-center justify-center min-h-[40vh] px-6 text-center">
         <p className="text-xs tracking-widest text-[#0D0D0D]/30 uppercase mb-3">Erro</p>
         <h2 className="text-2xl font-light text-[#0D0D0D] mb-2">Algo correu mal</h2>
         <p className="text-sm text-[#0D0D0D]/50 mb-8 max-w-sm">{error?.message}</p>
         <button
            onClick={reset}
            className="text-sm border border-[#0D0D0D]/20 px-5 py-2.5 rounded-xl
                   hover:bg-[#0D0D0D]/5 transition-colors"
         >
            Tentar novamente
         </button>
      </div>
   )
}