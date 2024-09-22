import ollama

model = 'llama3.1:8b'
question = 'Gere um roadmap para a área de front-end. Coloque no formato JSON em topicos. Para cada tópico, discorra o máximo possível sobre o tópico. Para cada tópico, informe links de documentações, indicações de livros ou artigos e outras referências que você tenha. O roadmap deve ter no máximo 2 tópicos. Responda apenas o JSON, ou seja, não responda informações adicionais além dele.'

response = ollama.chat(model=model, messages=[
  {
    'role': 'user',
    'content': question
  }
], stream=False)

print(question + "\n")

print(response['message']['content'])

# for chunk in response:
#   print(chunk['message']['content'], end='', flush=True)