import { NextResponse } from "next/server";
import { ZodError } from "zod";

export class HttpError extends Error {
  status = 500;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

export default function errorHandler(error: unknown) {
  if (error instanceof ZodError) {
    const field = error.issues[0].path[0].toString();
    const message = error.issues[0].message.toString();
    const fieldName = field[0].toUpperCase() + field.substring(1);
    //substring will get char of string from start to end
    //ex: "Angel" do substring(2) will get "gel"
    return NextResponse.json(
      { message: fieldName + ": " + message.toLowerCase() },
      { status: 400 },
    );
  }

  if (error instanceof HttpError) {
    return NextResponse.json(
      { message: error.message },
      { status: error.status },
    );
  }

  return NextResponse.json(
    { message: "Internal Server Error" },
    { status: 500 },
  );
}
