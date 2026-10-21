import { Component, type ReactNode } from 'react'

type ModelErrorBoundaryProps = {
  onError: (error: Error) => void
  children: ReactNode
}

type ModelErrorBoundaryState = {
  failed: boolean
}

export class ModelErrorBoundary extends Component<ModelErrorBoundaryProps, ModelErrorBoundaryState> {
  override state: ModelErrorBoundaryState = { failed: false }

  static getDerivedStateFromError(): ModelErrorBoundaryState {
    return { failed: true }
  }

  override componentDidCatch(error: Error) {
    this.props.onError(error)
  }

  override render() {
    return this.state.failed ? null : this.props.children
  }
}
