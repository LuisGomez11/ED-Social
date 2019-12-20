const local = 'http://localhost:3000'

const api = '/api'

// export const environment = {
//   production: true,
//   Encrypt: 'sfkhehfuewfhefheoIFHIFEHFIOEWGHEWIGOHasfe<g<e<24<22<24242-.4-.2{+´242222osrjwi',
//   urlUsers: api + '/user',
//   urlSignUp: api + '/user/signup',
//   urlLogin: api + '/user/login',
//   urlPublication: api + '/publication',
//   urlConversation: api + '/conversation/',
//   apiUrlUserUpload: api + '/user/upload'
// };

export const environment = {
  production: true,
  Encrypt: 'sfkhehfuewfhefheoIFHIFEHFIOEWGHEWIGOHasfe<g<e<24<22<24242-.4-.2{+´242222osrjwi',
  urlUsers: local + api + '/user',
  urlSignUp: local + api + '/user/signup',
  urlLogin: local + api + '/user/login',
  urlPublication: local + api + '/publication',
  urlConversation: local + api + '/conversation/',
  apiUrlUserUpload: local + api + '/user/upload'
};
