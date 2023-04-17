module.exports = (server) => {

// Process Handling


// When something throws an unexpected error (log rather than just crash)
process.on('uncaughtException', err => {
  console.log(`Uncaught Exception: ${err.message}`)
  process.exit(1)
})

// When *somewhere* a promise is rejected
process.on('unhandledRejection', (reason, promise) => {
  // console.log('reasonObj', reason);
  console.log('Unhandled rejection at ', promise, `reason: ${reason.message}`)
  process.exit(1)
})

// So you can do something just before it closes (Event loop still running)
// process.on('beforeExit', code => {
//   // Can make asynchronous calls
//   setTimeout(() => {
//     console.log(`Process will exit with code: ${code}`)
//     process.exit(code)
//   }, 100)
// })

// You are notified that event loop has closed
process.on('exit', code => {
  // Only synchronous calls
  console.log(`Process exited with code: ${code}`)
})

// Signals from the OS
// Signal to expect a successful termination
// process.on('SIGTERM', signal => {
//   console.log(`Process ${process.pid} received a SIGTERM signal`)
//   process.exit(0)
// })

// Signal is interupted (e.g. you pressed ctrl + c)
process.on('SIGINT', signal => {
  console.log(`Process ${process.pid} has been interrupted`)
  process.exit(0)
})

// Graceful Shutdown example
process.on('SIGTERM', _ => {
  console.log(`Process ${process.pid} received a SIGTERM signal`)
  server.close(() => {
    process.exit(0)
  })
  // If server hasn't finished in 1000ms, shut down process
  setTimeout(() => {
    process.exit(0)
  }, 1000).unref() // Prevents the timeout from registering on event loop
})
}