import { Configuration, OpenAIApi } from "openai";
import handler from "./apiRoute";

const configuration = new Configuration({
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message: "OpenAI API key not configured, please follow instructions in README.md",
      }
    });
    return;
  }

  const animal = req.body.animal || '';
  if (animal.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "You need 90 credsss",
      }
    });
    return;
  }

  try {
    const FINE_TUNED_MODEL = "curie:ft-personal-2023-03-06-10-36-14"
    const completion = await openai.createCompletion({
      model: FINE_TUNED_MODEL,
      prompt: generatePrompt(animal),
      temperature: 0,
      max_tokens: 50,
    });
    res.status(200).json({ result: completion.data.choices[0].text });
  } catch(error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: 'An error occurred during your request.',
        }
      });
    }
  }
}

function generatePrompt(animal) {
  return animal;
}
