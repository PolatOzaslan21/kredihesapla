from playwright.sync_api import sync_playwright
import os

def test_pages():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Get local paths
        index_path = f"file://{os.path.abspath('index.html')}"
        blog6_path = f"file://{os.path.abspath('blog6.html')}"

        print("Testing index.html...")
        page.goto(index_path)

        # Verify blog6 is listed in index.html
        blog_link = page.locator('a[href="blog6.html"]')
        assert blog_link.count() > 0, "Blog 6 link not found on index.html"
        print("Blog 6 link found on index.html!")

        print("Testing blog6.html...")
        page.goto(blog6_path)

        # Verify title
        assert "Araç Kredisi mi İhtiyaç Kredisi mi? 2026 Karşılaştırma Rehberi" in page.title()
        print("Blog 6 title is correct!")

        # Verify covrixa link
        covrixa_link = page.locator('a[href="https://covrixa.com/tr/kredi-hesaplayici/"]')
        assert covrixa_link.count() > 0, "Covrixa link not found in blog6.html"
        print("Covrixa link found in blog6.html!")

        browser.close()
        print("All frontend tests passed!")

if __name__ == "__main__":
    test_pages()
