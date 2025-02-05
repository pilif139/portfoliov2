import { render, screen, fireEvent } from "@testing-library/react";
import ContentForm from "./ContentForm";
import CreatePostContextProvider from "./CreatePostContextProvider";

describe("ContentForm", () => {
    test("renders without errors and match snapshot", () => {
        const { container } = render(
            <CreatePostContextProvider>
                <ContentForm />
            </CreatePostContextProvider>);
        expect(container).toMatchSnapshot();
    });

    test("displays the correct content type labels", async () => {
        render(
            <CreatePostContextProvider>
                <ContentForm />
            </CreatePostContextProvider>
        );
        const contentTypeLabels = {
            p: "Text",
            h1: "Heading",
            h2: "Subheading",
            h3: "Subheading",
            h4: "Subheading",
            image: "Image",
            video: "Video",
            file: "File",
            link: "URL",
            tag: "Tag",
        } as const;

        const selectInput = screen.getByLabelText("Type");
        for (const key of Object.keys(contentTypeLabels) as Array<keyof typeof contentTypeLabels>) {
            fireEvent.change(selectInput, { target: { value: key } });
            fireEvent.blur(selectInput);

            expect(screen.getByLabelText(contentTypeLabels[key])).toBeInTheDocument();

        }
    });

    test("validates text input length", () => {
        render(
            <CreatePostContextProvider>
                <ContentForm />
            </CreatePostContextProvider>);
        const textInput = screen.getByLabelText("Text");
        fireEvent.change(textInput, { target: { value: "ab" } });
        fireEvent.blur(textInput);
        //wait 300ms for debounce
        setTimeout(() => {
            expect(screen.getByText("Text must be at least 3 characters long")).toBeInTheDocument();
        }, 300);
    });
});