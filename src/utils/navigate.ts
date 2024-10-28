const navigate: (to: string) => void = (to: string) => {
  const event = new CustomEvent<string>('navigate', { detail: to })
  window.dispatchEvent(event)
}

export default navigate
