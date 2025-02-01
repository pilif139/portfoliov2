"use client"

import { useRef, useState } from "react"

export default function useFileReader(maxSizeInMB: number = 4.5 /* in MB, default 4.5MB is for vercel file storage */) {
    const [fileErrors, setFileErrors] = useState<string | null>(null)
    const fileRef = useRef<HTMLInputElement>(null)

    const validateFileInput = () => {
        const input = fileRef.current
        if (input && input.files && input.files[0]) {
            const file = input.files[0]
            const MB = 1024 * 1024
            if (file.size > MB * maxSizeInMB) {
                setFileErrors(`File size must be less than ${maxSizeInMB}MB`)
            } else {
                setFileErrors(null)
            }
        } else {
            setFileErrors("No file selected")
        }
    }

    const readFile = async () => {
        const input = fileRef.current
        if (input && input.files && input.files[0] && !fileErrors) {
            const file = input.files[0]
            return new Promise((resolve, reject) => {
                const reader = new FileReader()
                reader.onload = (e) => {
                    if (e.target?.result) {
                        setFileErrors(null)
                        resolve(e.target.result as string)
                    } else {
                        setFileErrors("Error reading file")
                        reject("Error reading file")
                    }
                }
                reader.onerror = (e) => {
                    reject("Error reading file: " + e)
                }
                reader.readAsDataURL(file)
            })
        } else {
            setFileErrors("No file selected")
            return null
        }
    }

    return { fileRef, fileErrors, setFileErrors, validateFileInput, readFile }
}
