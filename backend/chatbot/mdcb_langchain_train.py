# langchain_train.py
import os
import dotenv
dotenv.load_dotenv()

from langchain.document_loaders import PyPDFLoader
from langchain.text_splitter import CharacterTextSplitter
from langchain.vectorstores import Chroma
from langchain.embeddings import OpenAIEmbeddings
from langchain.agents.agent_toolkits import create_retriever_tool

# PDF 파일 로드
file_path = "/home/ai/ai/snowball/backend/chatbot/rain.pdf"
loader = PyPDFLoader(file_path)
documents = loader.load()

# 텍스트를 작은 조각으로 나누기
text_splitter = CharacterTextSplitter(chunk_size=1000, chunk_overlap=50)
texts = text_splitter.split_documents(documents)

# 임베딩 생성
embeddings = OpenAIEmbeddings()

# Chroma 벡터 스토어 사용
persist_directory = 'db'
db = Chroma.from_documents(
    documents=texts, 
    embedding=embeddings,
    persist_directory=persist_directory
)

# 데이터베이스를 저장
db.persist()

# retriever 객체를 생성하여 인덱싱된 데이터에서 검색을 수행하게 함
retriever = db.as_retriever()

# 도구 생성
tool = create_retriever_tool(
    retriever,
    "medease_qa",
    "Searches and returns documents regarding the medease_qa PDF file.",
)

# 도구를 JSON 파일로 저장
import json

tool_data = {
    'retriever': tool.retriever,
    'name': tool.name,
    'description': tool.description,
}

with open("retriever_tool.json", "w") as f:
    json.dump(tool_data, f)