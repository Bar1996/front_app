export function confirmValidator(password: string, confirmPassword: string) {
    if (!confirmPassword) return "Confirm password can't be empty."
    if (password !== confirmPassword) return 'Passwords do not match.'
    return ''
  }
  