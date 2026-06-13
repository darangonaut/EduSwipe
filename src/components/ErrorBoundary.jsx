import { Component } from 'react'

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error) {
    console.error('EduSwipe error:', error)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex h-screen w-screen flex-col items-center justify-center bg-neutral-900 p-8 text-center text-white">
          <p className="mb-4 text-5xl">😵</p>
          <p className="mb-6 text-xl">Něco se pokazilo.</p>
          <button
            onClick={() => window.location.reload()}
            className="rounded-2xl bg-white px-6 py-3 font-bold text-neutral-900 transition-transform active:scale-95"
          >
            Načíst znovu
          </button>
        </div>
      )
    }
    return this.props.children
  }
}
