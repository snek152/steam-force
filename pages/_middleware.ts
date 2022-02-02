import { NextMiddleware, NextResponse } from "next/server"

const middleware: NextMiddleware = async (req, res) => {
  const cookie = JSON.parse(req.cookies.user || "{}")
  switch (req.page.name) {
    case "/signup":
    case "/login":
      if (
        cookie.loading === undefined &&
        cookie.uid !== null &&
        !cookie.anonymous
      ) {
        return NextResponse.redirect("/account")
      }
      break
    case "/account":
      if (cookie.uid === null && cookie.loading === false) {
        return NextResponse.redirect("/")
      }
      break
    default:
      break
  }
  return NextResponse.next()
}

export { middleware }
