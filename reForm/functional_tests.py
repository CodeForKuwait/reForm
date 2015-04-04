from selenium import webdriver
import unittest


class NewVisitorTest(unittest.TestCase):

    def setUp(self):
        self.browser = webdriver.Firefox()
        self.browser.implicitly_wait(3)

    def tearDown(self):
        # Fulan closes his browser
        self.browser.quit()

    def test_can_start_a_form_and_retrieve_it_later(self):
        # Fulan has heard about an amazing service for filling out government forms.
        # He goes to check out the homepage
        self.browser.get('http://localhost:8000')

        # He notices the page title and the header say "reForm"
        self.assertIn('reForm', self.browser.title)

        self.fail("Finish the test!")


if __name__ == '__main__':
    unittest.main()
