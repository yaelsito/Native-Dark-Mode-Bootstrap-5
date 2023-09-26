/*
Project to view how to implement a Native Dark Mode with Bootstrap 5.3
WRITED BY YAEL MASSIEU.
Telegram: @sterytools
Insta: @is.leay
Portfolio: https://yael.pages.dev/
Github: https://github.com/yaelsito/
*/
(() => {
  'use strict'

  const getStoredTheme = () => localStorage.getItem('theme')
  const setStoredTheme = theme => localStorage.setItem('theme', theme)

  const getPreferredTheme = () => {
    const storedTheme = getStoredTheme()
    if (storedTheme) {
      return storedTheme
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }

  const setTheme = theme => {
    if (theme === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.setAttribute('data-bs-theme', 'dark')
    } else {
      document.documentElement.setAttribute('data-bs-theme', theme)
    }
  }

  setTheme(getPreferredTheme())

  const showActiveTheme = (theme, focus = false) => {
    const toggleTheme = document.querySelector('#toggle-theme')
    const themeIconLight = document.querySelector('.theme-icon-light')
    const themeIconDark = document.querySelector('.theme-icon-dark')

    if (!toggleTheme) {
      return
    }

    toggleTheme.checked = theme === 'dark'
    themeIconLight.style.display = theme === 'dark' ? 'none' : 'inline-block'
    themeIconDark.style.display = theme === 'dark' ? 'inline-block' : 'none'

    if (focus) {
      toggleTheme.focus()
    }
  }

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    const storedTheme = getStoredTheme()
    if (storedTheme !== 'light' && storedTheme !== 'dark') {
      setTheme(getPreferredTheme())
      showActiveTheme(getPreferredTheme())
    }
  })

  window.addEventListener('DOMContentLoaded', () => {
    showActiveTheme(getPreferredTheme())

    const toggleTheme = document.querySelector('#toggle-theme')
    if (toggleTheme) {
      toggleTheme.addEventListener('change', () => {
        const theme = toggleTheme.checked ? 'dark' : 'light'
        setStoredTheme(theme)
        setTheme(theme)
        showActiveTheme(theme, true)
      })
    }
  })
})()