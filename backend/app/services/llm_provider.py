from abc import ABC, abstractmethod
import os
from huggingface_hub import InferenceClient
from google import genai
from dotenv import load_dotenv

load_dotenv()

class ArticleGenerator(ABC):
    """
    Abstract interface for generating news articles.
    Ensures flexibility to easily swap the model later without changing app logic.
    """
    @abstractmethod
    def generate_article(self, headline: str, summary: str) -> str:
        pass


class HuggingFaceGenerator(ArticleGenerator):
    """
    A concrete implementation calling the Mistral 7B Instruct v0.3 model
    via Hugging Face Inference API.
    """
    def __init__(self, model_id: str = "mistralai/Mistral-7B-Instruct-v0.3"):
        self.model_id = model_id
        # Will automatically pick HF_TOKEN from environment if set
        self.client = InferenceClient(model=self.model_id)

    def generate_article(self, headline: str, summary: str) -> str:
        prompt = f"""Write a professional, 3-paragraph business news article based on the following headline and summary.
The article should be factual, easy to read, and expand logically on the provided information.

Headline: {headline}
Summary: {summary}

Article:"""
        try:
            # We use chat_completion for chat/instruct tuned models
            response = self.client.chat_completion(
                messages=[{"role": "user", "content": prompt}],
                max_tokens=400,
                temperature=0.3
            )
            # Access the first choice message content
            generated_text = response.choices[0].message.content.strip()
            return generated_text
        except Exception as e:
            print(f"Error generating article with Hugging Face: {e}")
            # Fallback to returning the summary in case of API failure
            return f"{summary}\n\n(Note: Failed to generate expanded article due to an API error.)"


class GoogleGeminiGenerator(ArticleGenerator):
    """
    A concrete implementation calling Gemini models
    via the official google-genai SDK.
    """
    def __init__(self, model_id: str = "gemini-2.5-flash"):
        self.model_id = model_id
        # Client automatically picks up GEMINI_API_KEY from environment
        self.client = genai.Client()

    def generate_article(self, headline: str, summary: str) -> str:
        prompt = f"""Write a professional, 3-paragraph business news article based on the following headline and summary.
The article should be factual, easy to read, and expand logically on the provided information.

Headline: {headline}
Summary: {summary}

Article:"""
        try:
            response = self.client.models.generate_content(
                model=self.model_id,
                contents=prompt,
            )
            return response.text.strip()
        except Exception as e:
            print(f"Error generating article with Gemini: {e}")
            return f"{summary}\n\n(Note: Failed to generate expanded article due to an API error.)"


# Factory to get our active provider
def get_llm_provider() -> ArticleGenerator:
    return GoogleGeminiGenerator()
