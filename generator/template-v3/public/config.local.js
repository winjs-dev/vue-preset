window.LOCAL_CONFIG = {
  API_HOME: 'https://api.github.com/users',
  API_UPLOAD: 'https://api.github.com/upload'<%_ if (options.application !== 'pc') { _%>,
  // vconsole 开关
  IS_OPEN_VCONSOLE: true
  <%_ } _%>
}
