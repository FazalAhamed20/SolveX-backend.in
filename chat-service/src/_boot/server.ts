
export default async (app: any) => {
  const PORT = 3006
  app.listen(PORT, () => {
    console.log(`⚡ Server is listening at ${PORT}`)
  })
}