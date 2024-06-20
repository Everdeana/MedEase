# import dotenv
# dotenv.load_dotenv()

from langchain.document_loaders import TextLoader 
from langchain.text_splitter import CharacterTextSplitter
from langchain.vectorstores import FAISS
from langchain.embeddings import OpenAIEmbeddings
from langchain.docstore.document import Document
from langchain.vectorstores import Chroma
from langchain.chains import RetrievalQA
import os


os.environ["OPENAI_API_KEY"] = ''

# ------------------------------------------------------------------------------------
# 학습결과 불러오기
# ------------------------------------------------------------------------------------
#persist_directory = 'medeasedb' # medeasedb1,2,3 이런식으로 저장해서 뭐가 더 좋은지 구분
persist_directory = '/home/ai/ai/snowball/backend/chatbot/medeasedb'
embedding = OpenAIEmbeddings()

vectordb = Chroma(
    persist_directory=persist_directory,
    embedding_function=embedding
)

# ------------------------------------------------------------------------------------
# Make a retriever : 결과를 만들기
# ------------------------------------------------------------------------------------
# 응답처리하기
retriever = vectordb.as_retriever(search_kwargs={'k': 3})

def openai_chat(message):
    docs = retriever.get_relevant_documents(message)
    msg = '<참고서류>\n'
    for doc in docs:
        msg += doc.metadata['source'] + '\n'
    return msg

# Define the function to process LLM response
# def process_llm_response(llm_response):
#     msg = '<AI 응답>\n'
#     msg += llm_response['result'] + '\n'
#     msg += '\n\n<참고문서>\n'
#     for source in llm_response['source_documents']:
#         msg += source.metadata['source'] + '\n'
#         msg += '<참고내용>\n'
#         msg += source.page_content + '\n\n'
#     return msg
def process_llm_response(llm_response):
    # 'text' 키가 존재하는지 확인하고, 그렇지 않으면 'result' 키를 사용
    if 'text' in llm_response:
        return {"output": llm_response['text']}
    elif 'result' in llm_response:
        return {"output": llm_response['result']}
    else:
        raise KeyError("Neither 'text' nor 'result' key found in llm_response")


# ------------------------------------------------------------------------------------
# ChatGPT 모델 수정
# ------------------------------------------------------------------------------------
# ChatGPT 모델 지정
from langchain.agents.agent_toolkits import create_conversational_retrieval_agent
from langchain.chat_models import ChatOpenAI

llm = ChatOpenAI(
    model_name='gpt-4-turbo',
    temperature=0
)
# ------------------------------------------------------------------------------------
# Make a chain : 체인으로 연결하기
# ------------------------------------------------------------------------------------
qa_chain = RetrievalQA.from_chain_type(
    llm=llm,
    chain_type='stuff',
    retriever=retriever,
    return_source_documents=True
)


# def openai_chat_ai(message):
#     llm_response = qa_chain(message)
#     msg = process_llm_response(llm_response)
#     return msg

def openai_chat_ai(message):
    llm_response = qa_chain({"query": message})
    msg = process_llm_response(llm_response)
    #print(f"Processed LLM Response: {msg}")  # 디버깅용 출력
    return msg

# streamlit을 사용하여 웹 인터페이스를 구성하기
import streamlit as st
import time
##############################################################################
#Tailwind CSS 포함
css_code = """
<style>
/* 제목 스타일 */
div[data-testid="stHeadingWithActionElements"] {
    padding-top: 0 !important;
    margin-top: -80px !important; /* 제목을 위로 올리기 */
    text-align: center; /* 텍스트 중앙 정렬 */
    text-decoration: none;
    box-shadow: inset 0 -10px 0 hsla(53, 90%, 83%, 0.93);
    padding-bottom:2px;
}

div[class="block-container st-emotion-cache-1eo1tir ea3mdgi5"]{
    max-width: 1800px;  /* 채팅창 최대 너비 조정 */
    margin: auto; /* 가운데 정렬 */
}
div[class="stChatMessage st-emotion-cache-1c7y2kd eeusbqq4"]{
    margin-top: -16px !important; /* 위쪽 여백 줄이기 */
    margin-bottom: -16px !important; /* 아래쪽 여백 줄이기 */
}
div[class="stChatMessage st-emotion-cache-4oy321 eeusbqq4"]{
    margin-top: -16px !important; /* 위쪽 여백 줄이기 */
    margin-bottom: -16px !important; /* 아래쪽 여백 줄이기 */
}
div[class="st-emotion-cache-1kyxreq e115fcil2"]{
    width:100%;
}
h1[id="medease-chatbot"]{
    margin : auto;
}
div[class="st-emotion-cache-1v0mbdj e115fcil1"]{
    margin:auto;
    max-width:50%
}
div[class="st-emotion-cache-1bs97qc e1f1d6gn2"]{
    border: 2px solid lightgray; /* 연한 회색 테두리 추가 */
    border-radius: 7px; /* 모서리를 둥글게 */
}
div[class="st-emotion-cache-vdokb0 e1nzilvr4"]{
    font-size: 8px !important;
}
.st-emotion-cache-12fmjuu {
    height: 1.3rem;
}
.st-emotion-cache-bm2z3a{
    top:-20px;
}
</style>
"""
# CSS 적용
st.markdown(css_code, unsafe_allow_html=True)

# st.markdown('<div class="chat-title">MEDEASE CHATBOT</div>', unsafe_allow_html=True)

##############################################################################
# 제목과 이미지 나란히 배치
col1, col2 = st.columns([1, 1])  # 비율을 조정하여 열의 너비를 설정

with col1:
    st.title("Ask MEDI!")
with col2:
    st.image("/home/ai/ai/snowball/backend/chatbot/medi1-removebg.gif")

# 모델 설정
if "messages" not in st.session_state:
    st.session_state.messages = []

for message in st.session_state.messages:
    with st.chat_message(message["role"]):
        st.markdown(message["content"])

if prompt := st.chat_input("입력해주세요."):
    st.session_state.messages.append({"role": "user", "content": prompt})
    with st.chat_message("user"):
        st.markdown(prompt)

    with st.chat_message("assistant"):
        message_placeholder = st.empty()
        full_response = ""

        result = openai_chat_ai(prompt)
        #print(f"Result from openai_chat_ai: {result}")  # 디버깅용 출력
        for chunk in result['output'].split():
            full_response += chunk + " "
            time.sleep(0.05)

            message_placeholder.markdown(full_response + "▌")
        message_placeholder.markdown(full_response)
    st.session_state.messages.append({"role": "assistant", "content": full_response})
