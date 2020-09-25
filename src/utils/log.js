function info() {
  console.info.apply(window, arguments)
}

function log() {
  console.log.apply(window, arguments);
}

function warn() {
  console.warn.apply(window, arguments);
}

function error() {
  console.error.apply(window, arguments);
}

export default {
  info: info,
  log: log,
  warn: warn,
  error: error
}
