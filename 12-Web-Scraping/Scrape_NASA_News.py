{
 "cells": [
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "Scrape_NASA_News"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 1,
   "metadata": {},
   "outputs": [],
   "source": [
    "from splinter import Browser\n",
    "from bs4 import BeautifulSoup"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 2,
   "metadata": {},
   "outputs": [],
   "source": [
    "def init_browser():\n",
    "    executable_path = {\"executable_path\": \"C:\\Program Files (x86)\\chromedriver_win32\"}\n",
    "    return Browser(\"chrome\", **executable_path, headless=False)"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 3,
   "metadata": {},
   "outputs": [],
   "source": [
    "def scrape():\n",
    "    browser = init_browser()\n",
    "    listings = {}\n",
    "\n",
    "    url = \"https://mars.nasa.gov/news/\"\n",
    "    browser.visit(url)\n",
    "\n",
    "    html = browser.html\n",
    "    soup = BeautifulSoup(html, \"html.parser\")\n",
    "\n",
    "    \n",
    "    listings[\"news_title\"] = soup.find(\"div\", class_=\"content_title\").get_text()\n",
    "    listings[\"news_p\"] = soup.find(\"div\", class_=\"article_teaser_body\").get_text()\n",
    "    \n",
    "    return listings\n"
   ]
  }
 ],
 "metadata": {
  "kernelspec": {
   "display_name": "Python 3",
   "language": "python",
   "name": "python3"
  },
  "language_info": {
   "codemirror_mode": {
    "name": "ipython",
    "version": 3
   },
   "file_extension": ".py",
   "mimetype": "text/x-python",
   "name": "python",
   "nbconvert_exporter": "python",
   "pygments_lexer": "ipython3",
   "version": "3.7.4"
  }
 },
 "nbformat": 4,
 "nbformat_minor": 4
}
