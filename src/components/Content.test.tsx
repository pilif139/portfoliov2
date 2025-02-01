import { render, screen } from "@testing-library/react"
import Content from "./Content"

jest.mock("next/image", () => ({ src, alt }: { src: string; alt: string }) => <img src={src} alt={alt} />)

describe("Content component", () => {
    it("should render h1", () => {
        const { container } = render(<Content content={{ type: "h1", content: "Hello" }} />)
        expect(container).toMatchSnapshot()
    })

    it("should render h2", () => {
        const { container } = render(<Content content={{ type: "h2", content: "Hello" }} />)
        expect(container).toMatchSnapshot()
    })

    it("should render h3", () => {
        const { container } = render(<Content content={{ type: "h3", content: "Hello" }} />)
        expect(container).toMatchSnapshot()
    })

    it("should render h4", () => {
        const { container } = render(<Content content={{ type: "h4", content: "Hello" }} />)
        expect(container).toMatchSnapshot()
    })

    it("should render p", () => {
        const { container } = render(<Content content={{ type: "p", content: "Hello" }} />)
        expect(container).toMatchSnapshot()
    })

    it("should render image", () => {
        const { container } = render(<Content content={{ type: "image", content: "image.jpg", altText: "alternative text" }} />)
        expect(container).toMatchSnapshot()
        expect(screen.getByAltText("alternative text")).toBeInTheDocument()
    })

    it("should render video", () => {
        const { container } = render(<Content content={{ type: "video", content: "video.mp4" }} />)
        expect(container).toMatchSnapshot()
    })

    it("should render anchor tag", () => {
        const { container } = render(<Content content={{ type: "file", content: "file.pdf" }} />)
        expect(container).toMatchSnapshot()
        expect(screen.getByText("Download file")).toBeInTheDocument()
    })

    it("should render nothing", () => {
        const { container } = render(<Content content={{ content: "Hello" }} />)
        expect(container.firstChild).toBeNull()
    })
})
