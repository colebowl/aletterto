package common

import (
	"bytes"
	"context"
	"encoding/base64"
	"fmt"
	"log"
	"os"
	"text/template"
	"time"

	"github.com/chromedp/cdproto/page"
	"github.com/chromedp/chromedp"
)

// Base template with placeholders for dynamic content
const baseHtmlTemplate = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
			@page {
				size: A4;
				margin-top: 50px;
				margin-bottom: 50px;
			}
			@font-face {
				font-family: "TT2020BaseRegular";
				src: url("data:font/woff2;base64,{{ .FontBase64 }}") format("woff2");
				font-weight: normal;
				font-style: normal;
			}
				
     body {
        font-family: "TT2020BaseRegular";
        font-weight: normal;
        font-style: normal;
				line-height: 1.3rem;
        margin: 0;
        padding: 0;
        background-color: #fff;
      }
      .container {
        width: 100%;
        margin: 0 auto;
      }
    </style>
</head>
<body>
    <div class="container">
        <!-- Inject incoming HTML content here -->
        {{ .Content }}
    </div>
</body>
</html>
`

// CompileLetterHtmlForPdf injects the incoming HTML content into the base template
func CompileLetterHtmlForPdf(htmlContent string) (string, error) {
	// Path to your local font file
	fontPath := "common/fonts/TT2020Base-Regular.woff2" // Replace with your actual font file path

	// Load and encode font
	fontBase64, err := LoadFontFile(fontPath)

	if err != nil {
		return "", fmt.Errorf("failed to load font file: %w", err)
	}
	// Parse the base template
	tmpl, err := template.New("email").Parse(baseHtmlTemplate)
	if err != nil {
		return "", fmt.Errorf("failed to parse base template: %w", err)
	}

	// Data to be injected into the template
	data := struct {
		Content    string
		FontBase64 string
	}{
		Content:    htmlContent,
		FontBase64: fontBase64,
	}

	// Buffer to store the compiled template
	var buffer bytes.Buffer

	// Execute the template with data and write the output to the buffer
	if err := tmpl.Execute(&buffer, data); err != nil {
		return "", fmt.Errorf("failed to execute template: %w", err)
	}

	// Return the final compiled HTML as a string
	return buffer.String(), nil
}

// LoadFontFile reads a font file from the file system and encodes it to Base64
func LoadFontFile(filePath string) (string, error) {
	fontData, err := os.ReadFile(filePath)
	if err != nil {
		return "", fmt.Errorf("failed to read font file: %w", err)
	}

	// Convert font to Base64
	fontBase64 := base64.StdEncoding.EncodeToString(fontData)
	return fontBase64, nil
}

// ConvertHTMLToPDF Generate a PDF file from the provided HTML. Returns a buffer
func ConvertHTMLToPDF(html string) ([]byte, error) {
	// Create a new context
	ctx, cancel := chromedp.NewContext(context.Background())
	defer cancel()

	// Set a timeout for the operation
	ctx, cancel = context.WithTimeout(ctx, 30*time.Second)
	defer cancel()

	// Generate PDF from HTML
	var pdfBuf []byte

	compiledLetterHtml, compileError := CompileLetterHtmlForPdf(html)

	if compileError != nil {
		return pdfBuf, compileError
	}

	encodedHtml := base64.StdEncoding.EncodeToString([]byte(compiledLetterHtml))

	err := chromedp.Run(ctx,
		chromedp.Navigate("data:text/html;base64,"+encodedHtml),
		chromedp.WaitReady("body"),
		chromedp.ActionFunc(func(ctx context.Context) error {
			var err error
			pdfBuf, _, err = page.PrintToPDF().WithPrintBackground(true).Do(ctx)
			return err
		}),
	)

	if err != nil {
		log.Printf("Error generating PDF: %v", err)
		return pdfBuf, err
	}

	return pdfBuf, nil
}
