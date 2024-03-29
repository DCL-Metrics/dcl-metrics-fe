import { act } from "react-dom/test-utils"
import { render, screen, fireEvent } from "@testing-library/react"
import FeedbackMenu from "../../../src/components/global/FeedbackMenu"
import { sendFeedback } from "../../../src/lib/hooks/sendNotification"

jest.mock("../../../src/lib/hooks/sendNotification", () => ({
  sendFeedback: jest.fn(),
}))

describe("FeedbackMenu", () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  it("should submit the form with the correct values", async () => {
    render(<FeedbackMenu />)

    const nameInput = screen.getByTestId("name")
    const contactInput = screen.getByTestId("contact")
    const messageInput = screen.getByTestId("msg")
    const submitButton = screen.getByRole("button", { name: "Send" })

    const name = "John Doe"
    const contact = "user@site.com"
    const message = "This is a test message"

    act(() => {
      fireEvent.change(nameInput, { target: { value: name } })
      fireEvent.change(contactInput, { target: { value: contact } })
      fireEvent.change(messageInput, { target: { value: message } })
    })

    act(() => {
      fireEvent.click(submitButton)
    })

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 500))
    })
  })
})
