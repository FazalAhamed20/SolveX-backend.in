

export default async (app: any) => {
  const PORT = 3004
  app.listen(PORT, () => {
    console.log(`⚡ Server is listening at ${PORT}`)
  })
}