function toggle() {
    const d = document;
    const b = d.querySelector('body');

    /* Declaring themes */
    var newTheme = '',
        currentTheme = ''
    // If current is dark declare new as light and viceversa
    b.classList.contains('dark-theme') ? currentTheme = 'dark' : currentTheme = 'light'
    currentTheme == 'dark' ? newTheme = 'light' : newTheme = 'dark'

    /* Getting arrays of elements to change */
    const bgClass = d.querySelectorAll('.bg-' + currentTheme)
    const btnClass = d.querySelectorAll('.btn-' + currentTheme)
    const btnOutClass = d.querySelectorAll('.btn-outline-' + newTheme)
    const textClass = d.querySelectorAll('.text-' + newTheme)
    const dropdownClass = d.querySelectorAll('.dropdown-menu-' + currentTheme)
    const lgBackgroundClass = d.querySelectorAll('.bg-lg-' + currentTheme)
    const fgClass = d.querySelectorAll('.fg-' + currentTheme)

    /* Changing elements theme */
    b.classList.replace(currentTheme + '-theme', newTheme + '-theme')
    bgClass.forEach(element => element.classList.replace("bg-" + currentTheme, "bg-" + newTheme))
    dropdownClass.forEach(element => element.classList.replace("dropdown-menu-" + currentTheme, "dropdown-menu-" + newTheme))
    btnOutClass.forEach(element => element.classList.replace("btn-outline-" + newTheme, "btn-outline-" + currentTheme))
    btnClass.forEach(element => element.classList.replace("btn-" + currentTheme, "btn-" + newTheme))
    textClass.forEach(element => element.classList.replace("text-" + newTheme, "text-" + currentTheme))
    lgBackgroundClass.forEach(element => element.classList.replace("bg-lg-" + currentTheme, "bg-lg-" + newTheme))
    fgClass.forEach(element => element.classList.replace("fg-" + currentTheme, "fg-" + newTheme))
    localStorage.setItem('theme', newTheme)
}