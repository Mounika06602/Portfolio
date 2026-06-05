document.addEventListener('DOMContentLoaded', () => {
    // ==========================================
    // THEME TOGGLE
    // ==========================================
    const themeToggleBtn = document.getElementById('theme-toggle');
    const body = document.body;

    // Check saved theme preference or default to dark
    const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
    if (savedTheme === 'light') {
        body.classList.remove('dark-theme');
        body.classList.add('light-theme');
    } else {
        body.classList.remove('light-theme');
        body.classList.add('dark-theme');
    }

    themeToggleBtn.addEventListener('click', () => {
        if (body.classList.contains('dark-theme')) {
            body.classList.remove('dark-theme');
            body.classList.add('light-theme');
            localStorage.setItem('portfolio-theme', 'light');
        } else {
            body.classList.remove('light-theme');
            body.classList.add('dark-theme');
            localStorage.setItem('portfolio-theme', 'dark');
        }
    });

    // ==========================================
    // MOBILE NAVIGATION MENU
    // ==========================================
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    const toggleMenu = () => {
        mobileMenuBtn.classList.toggle('open');
        navMenu.classList.toggle('open');
        // Prevent body scrolling when menu is open on mobile
        body.style.overflow = navMenu.classList.contains('open') ? 'hidden' : '';
    };

    mobileMenuBtn.addEventListener('click', toggleMenu);

    // Close menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('open')) {
                toggleMenu();
            }
        });
    });

    // ==========================================
    // NAVBAR SCROLL EFFECT
    // ==========================================
    const header = document.getElementById('header');
    
    const handleScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Trigger on load in case page is refreshed while scrolled down

    // ==========================================
    // HERO TYPING ANIMATION
    // ==========================================
    const typingTextElement = document.getElementById('typing-text');
    const words = ["Aspiring AI Engineer", "Data Scientist", "Backend Developer", "Machine Learning Enthusiast", "Python Developer", "Data Storyteller", "Tech Enthusiast", "Lifelong Learner"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    const typeEffect = () => {
        const currentWord = words[wordIndex];
        const displayedText = isDeleting 
            ? currentWord.substring(0, charIndex - 1) 
            : currentWord.substring(0, charIndex + 1);

        typingTextElement.textContent = displayedText;
        charIndex = isDeleting ? charIndex - 1 : charIndex + 1;

        // Speed adjustment
        if (!isDeleting && charIndex === currentWord.length) {
            // Pause at completion
            typingSpeed = 2000; 
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typingSpeed = 500; // Small delay before starting next word
        } else {
            typingSpeed = isDeleting ? 50 : 100;
        }

        setTimeout(typeEffect, typingSpeed);
    };

    // Start typing animation if element exists
    if (typingTextElement) {
        setTimeout(typeEffect, 1000);
    }

    // ==========================================
    // INTERACTIVE SKILLS PLAYGROUND
    // ==========================================
    const skillPlaygroundData = {
        genai: {
            name: "Generative AI & LLMs (LangChain, GPT-4, RAG)",
            level: "Proficiency: Advanced (88%)",
            exp: "Internships & Research Papers",
            code: `# RAG Diagnostic Log Pipeline Querying
from langchain.chat_models import ChatOpenAI
from langchain.chains import RetrievalQA
from langchain.vectorstores import PGVector

# Load logs database & LLM orchestrator
vector_store = PGVector.from_existing_index(
    connection_string="postgresql://...",
    embedding_function=OpenAIEmbeddings(),
    collection_name="etl_logs"
)
qa_chain = RetrievalQA.from_chain_type(
    llm=ChatOpenAI(model="gpt-4", temperature=0.1),
    retriever=vector_store.as_retriever(search_kwargs={"k": 3})
)

query = "Find error cause for Job ID 104 in NiFi ETL stage"
response = qa_chain.run(query)
print(f"QUERY: {query}")
print(f"DIAGNOSTIC RESOLUTION: {response}")`,
            output: `[LOAD VECTORS] Successfully loaded 3 vector splits from log collection.
[CONTEXT EXTRACTED] Match found: NiFi execution exception on node-18.
[LLM EXECUTE] Running ChatGPT-4 diagnosis...

QUERY: Find error cause for Job ID 104 in NiFi ETL stage
DIAGNOSTIC RESOLUTION: 
>> Pipeline failure in Job 104 is caused by a buffer overflow in the CSV parsing transform node.
>> The database column expected 'varchar(255)' but received a 1042-character input array.
>> RECOMMENDED ACTION: Scale database column to 'TEXT' or add validation rules to truncate arrays in downstream processor.

Execution time: 0.28s | Status: SUCCESS`
        },
        cv: {
            name: "Computer Vision (YOLOv8/v9, MediaPipe, OpenCV)",
            level: "Proficiency: Specialist (85%)",
            exp: "Freelance Dermatology Project",
            code: `# Skin Acne & Landmark Detection
import cv2
import mediapipe as mp
from ultralytics import YOLO

# Initialize MediaPipe Face Mesh & YOLO detector
mp_face_mesh = mp.solutions.face_mesh.FaceMesh(static_image_mode=True)
yolo_model = YOLO("yolov9-skin-blemish.pt")

image = cv2.imread("face_scan.jpg")
rgb_img = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)

# 1. Detect facial boundaries
mesh_results = mp_face_mesh.process(rgb_img)
# 2. Run object detection for localized blemishes
defects = yolo_model.predict(rgb_img, conf=0.35)

print(f"Mesh landmarks resolved: {len(mesh_results.multi_face_landmarks[0].landmark)} points")
print(f"Blemishes detected: {len(defects[0].boxes)} coordinates")`,
            output: `[INFO] Initializing MediaPipe FaceMesh subsystem... Done.
[INFO] Loading YOLOv9 custom weights... Done. (51.2M parameters)
[MODEL INFERENCE] Scanning pixel dimensions: 1080x1080...

Mesh landmarks resolved: 468 points
Blemishes detected: 5 coordinates
>> Coord 1: [x: 320, y: 154, w: 12, h: 10] - Severity: Mild Acne (Conf: 0.89)
>> Coord 2: [x: 412, y: 180, w: 8, h: 8] - Severity: Blemish (Conf: 0.72)
>> Coord 3: [x: 350, y: 220, w: 15, h: 14] - Severity: Acne (Conf: 0.91)

Verdict: Skincare routine recommendations generated successfully.`
        },
        forecasting: {
            name: "Time Series Forecasting (ARIMA, LSTM, Prophet)",
            level: "Proficiency: Advanced (84%)",
            exp: "Delhi Power Grid Project",
            code: `# Delhi Peak Load Forecasting Simulation
import pandas as pd
from prophet import Prophet
from keras.models import load_model

# 1. Forecast solar curve dip
prophet_model = Prophet(yearly_seasonality=True, weekly_seasonality=True)
prophet_model.fit(historical_grid_demand)
future = prophet_model.make_future_dataframe(periods=24, freq='H')
forecast = prophet_model.predict(future)

# 2. Refine predictions with LSTM network
lstm_model = load_model("delhi_grid_lstm.h5")
lstm_pred = lstm_model.predict(scaled_features_test)

print(f"Prophet baseline load forecast (peak hour 19:00): {forecast['yhat'].iloc[-5]:.2f} MW")
print(f"LSTM calibrated forecasting output: {lstm_pred[0][0]:.2f} MW")`,
            output: `[DATA ENGINE] Slicing historical dataset: 2021-2025.
[MODEL MODELING] Calibrating Prophet trendlines... Done.
[MODEL MODELING] Feeding sequences to LSTM layer... RMSE: 2.14, R2: 0.941

Prophet baseline load forecast (peak hour 19:00): 6,240.50 MW
LSTM calibrated forecasting output: 6,215.12 MW
>> Duck curve peak calibration delta: -25.38 MW (Optimal match)
Forecasting completed. Generating visual plots...`
        },
        ml: {
            name: "Machine Learning (Scikit-Learn, K-Means Clustering)",
            level: "Proficiency: Advanced (88%)",
            exp: "Customer Segmentation Project",
            code: `# K-Means Customer Clustering Pipeline
from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler
import pandas as pd

# Load customer transaction values
df = pd.read_csv("customer_spending.csv")
scaler = StandardScaler()
X_scaled = scaler.fit_transform(df[['spending_score', 'loyalty_index']])

# Apply clustering
kmeans = KMeans(n_clusters=3, init='k-means++', random_state=42)
df['cluster'] = kmeans.fit_predict(X_scaled)

print("K-Means Centroids:")
print(scaler.inverse_transform(kmeans.cluster_centers_))
print(f"Silhouette Score: {silhouette_score(X_scaled, kmeans.labels_):.3f}")`,
            output: `[INFO] Normalizing dataset shapes (10,000, 2)
[INFO] Iteration 1/10: inertia = 1420.5
[INFO] Iteration 5/10: convergence achieved.

K-Means Centroids:
[[ 82.5  14.2]  -> Cluster A: High Loyalty & Spenders
 [ 22.1   4.1]  -> Cluster B: High Churn Risk (Inactive)
 [ 55.4   8.8]] -> Cluster C: Value Seekers (Moderate Spend)

Silhouette Score: 0.614
>> Optimization verified: Elbow inflection at K=3.`
        },
        python: {
            name: "Python (FastAPI, Django, Flask)",
            level: "Proficiency: Expert (90%)",
            exp: "SCMLite & Smart Notes Backends",
            code: `# REST API Endpoint with JWT Role Guard
from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
import jwt

app = FastAPI(title="SCMLite API Gateway")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

@app.get("/api/v1/shipment/{shipment_id}")
async def fetch_shipment(shipment_id: str, token: str = Depends(oauth2_scheme)):
    # Validate signature
    payload = jwt.decode(token, "SECRET_KEY_EXF", algorithms=["HS256"])
    if payload.get("role") != "admin":
        raise HTTPException(status_code=403, detail="Insufficient clearance")
    
    shipment = await db.shipments.find_one({"id": shipment_id})
    return {"status": "success", "data": shipment}`,
            output: `[FastAPI] Server startup beginning...
[FastAPI] Uvicorn running on http://127.0.0.1:8000 (Press CTRL+C to quit)

>>> HTTP Request Logs:
GET /api/v1/shipment/SH-2891 HTTP/1.1
Header Token: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
[JWT DECODE] Validated admin clearance.
[MONGODB QUERY] Fetching shipment SH-2891...
HTTP Status 200 OK | Payload:
{
  "status": "success",
  "data": {
    "id": "SH-2891",
    "origin": "Tirupati, India",
    "destination": "New York, USA",
    "status": "In Transit"
  }
}`
        },
        sql: {
            name: "SQL (PostgreSQL, MySQL, SQLite)",
            level: "Proficiency: Advanced (85%)",
            exp: "ETL Diagnostics Log Store",
            code: `-- Recursive CTE to trace shipment pipeline dependencies
WITH RECURSIVE shipment_path AS (
    -- Anchor member
    SELECT id, parent_job_id, job_name, 1 AS depth
    FROM etl_workflow_jobs
    WHERE parent_job_id IS NULL
    
    UNION ALL
    
    -- Recursive member
    SELECT j.id, j.parent_job_id, j.job_name, p.depth + 1
    FROM etl_workflow_jobs j
    INNER JOIN shipment_path p ON j.parent_job_id = p.id
)
SELECT * FROM shipment_path ORDER BY depth ASC;`,
            output: `[QUERY PLAN] Running index scan on parent_job_id...
[QUERY RESULTS] Outputting dependency tree:

id  | parent_job_id | job_name              | depth
----+---------------+-----------------------+------
 1  | NULL          | SCMLite_Ingest_Kafka  | 1
 2  | 1             | Transform_Data_Schema | 2
 3  | 2             | MongoDB_Batch_Load    | 3
 4  | 3             | Email_Report_Notify   | 4

(4 rows returned) | Latency: 4.8ms`
        },
        html_css: {
            name: "HTML5 / CSS3 (Styling & Design Systems)",
            level: "Proficiency: Competent (75%)",
            exp: "Portfolio glassmorphism & layout",
            code: `/* CSS Glassmorphism Panel Tokens */
.glass-panel {
    background: rgba(16, 20, 35, 0.45);
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 16px;
    box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.5);
    transition: transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.glass-panel:hover {
    transform: translateY(-5px);
    border-color: rgba(255, 255, 255, 0.16);
}`,
            output: `[CSS COMPILER] Parsing styles system...
[CSS TOKENS] Variables compiled:
--bg-color: #080a10;
--primary-color: #3b82f6;

[CSS ENGINE] Rendering client layout tree...
Panel transparency index: 0.45
Blur radius: 24px
Hardware-acceleration status: Enabled (transform translate3d)
Compiled successfully with zero errors.`
        },
        pandas: {
            name: "Pandas, NumPy, Scikit-Learn (Data Wrangling)",
            level: "Proficiency: Advanced (88%)",
            exp: "ETL pipeline cleaning & forecasts",
            code: `# Data Wrangling & Feature Engineering
import pandas as pd
import numpy as np

# Load raw logs with parsing error handling
df = pd.read_csv("sensor_logs.csv", parse_dates=['timestamp'])
df['temperature_k'] = df['temperature_c'] + 273.15

# Impute missing values using linear interpolation
df['humidity_calibrated'] = df['humidity'].interpolate(method='linear')

# Group aggregation metrics
summary = df.groupby('sensor_id').agg({
    'temperature_k': ['mean', 'std'],
    'humidity_calibrated': ['max']
})
print(summary.head())`,
            output: `[DATAFRAME] Loaded shapes: (154202, 5)
[INFO] Imputing 124 null values in humidity column.
[DATA ENGINE] Grouping aggregate index by sensor_id...

          temperature_k             humidity_calibrated
                   mean        std                  max
sensor_id                                              
S-001        298.140502   1.428514            89.500000
S-002        301.421503   2.104255            92.120000

Memory footprint: 6.4 MB | Processed in 42ms`
        },
        docker: {
            name: "Docker & AWS Deployments (Containerization)",
            level: "Proficiency: Specialist (78%)",
            exp: "AWS EC2 instances & container builds",
            code: `# Dockerfile for FastAPI microservice production deployment
FROM python:3.10-slim

WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .
EXPOSE 8000
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]`,
            output: `[DOCKER ENGINE] Sending build context to Docker daemon... 240kB
Step 1/7 : FROM python:3.10-slim
 ---> b213b34df4e2
Step 2/7 : WORKDIR /app
 ---> c1b2a3d4e5f6
Step 3/7 : RUN pip install --no-cache-dir -r requirements.txt
Successfully installed uvicorn fastapi motor pydantic jwt
 ---> c1d2e3f4a5b6
Step 7/7 : CMD ["uvicorn", "main:app"]
Successfully built g1a2b3c4d5e6 (Tagged: scmlite-backend:latest)
[AWS EC2] Launching container service... Container active on port 8000.`
        },
        kafka: {
            name: "Apache Kafka & ZooKeeper (Event Streaming)",
            level: "Proficiency: Intern (70%)",
            exp: "Real-time streaming in SCMLite",
            code: `# Python Kafka Ingestion Producer
from kafka import KafkaProducer
import json
import time

producer = KafkaProducer(
    bootstrap_servers=['localhost:9092'],
    value_serializer=lambda v: json.dumps(v).encode('utf-8')
)

shipment_event = {
    "shipment_id": "SH-4892",
    "timestamp": time.time(),
    "status": "in_transit",
    "loc": "Hyderabad, India"
}

future = producer.send('shipment_events', value=shipment_event)
record_metadata = future.get(timeout=10)
print(f"Topic: {record_metadata.topic} | Partition: {record_metadata.partition}")`,
            output: `[ZOOKEEPER] Leader election coordinated successfully.
[KAFKA BROKER] Port 9092 connection established.
[KAFKA PRODUCER] Pushing record to cluster partition index 0...

Topic: shipment_events | Partition: 0 | Offset: 15482
Stream delivery status: DELIVERED (Ack status: ALL_SYNCED)
Latency: 18ms`
        },
        mongodb: {
            name: "MongoDB NoSQL Datastore (Schema Design)",
            level: "Proficiency: Advanced (85%)",
            exp: "SCMLite & Smart Notes storage",
            code: `# Async CRUD operations with Motor MongoDB client
from motor.motor_asyncio import AsyncIOMotorClient

client = AsyncIOMotorClient("mongodb://localhost:27017")
db = client.scmlite_db

# Query shipments matching specific pipeline filter
async def query_active_shipments():
    cursor = db.shipments.find({"status": {"$in": ["In Transit", "Pending"]}})
    shipments = await cursor.to_list(length=100)
    
    for s in shipments:
        print(f"SHIPMENT: {s['id']} | Carrier: {s['carrier']}")
    return len(shipments)`,
            output: `[MONGODB] Connecting to replica set cluster... Connected.
[MONGODB] Pinging primary db node... Latency: 1.2ms
[QUERY INFERENCE] Execution query plan: IXSCAN on index 'status_1'

SHIPMENT: SH-2891 | Carrier: DHL Logistics
SHIPMENT: SH-2892 | Carrier: FedEx Express

Documents returned: 2 records. | Total search scan time: 0.9ms`
        },
        bi: {
            name: "Power BI & Tableau (Business Intelligence)",
            level: "Proficiency: Advanced (80%)",
            exp: "WHO epidemic dashboards & KPI sheets",
            code: `// DAX Metric for Power BI dashboard KPI reporting
ActiveCasesRatio = 
DIVIDE(
    CALCULATE(SUM(COVID_Data[active_cases]), COVID_Data[region] = "Global"),
    CALCULATE(SUM(COVID_Data[confirmed_cases]), COVID_Data[region] = "Global"),
    0
)`,
            output: `[POWER BI SYSTEM] Refreshing data schema model...
[POWER BI SYSTEM] Connecting to REST API dataset source... Connected.
[KPI METRIC] Compiling DAX calculation:
ActiveCasesRatio = 0.0543 (5.43%)
Dashboard rendering status: SUCCESS
Tableau visualization mapping loaded for 194 countries.`
        },
        excel: {
            name: "Excel & Statistical Analysis",
            level: "Proficiency: Advanced (85%)",
            exp: "Core statistical modeling",
            code: `# Linear Regression Significance Testing
import scipy.stats as stats
import numpy as np

# Sample spending vs income values
income = np.array([45, 52, 60, 48, 70, 65, 80, 55])
spending = np.array([12, 15, 18, 14, 25, 20, 30, 16])

slope, intercept, r_value, p_value, std_err = stats.linregress(income, spending)
print(f"R-squared: {r_value**2:.3f}")
print(f"P-value: {p_value:.5f} (Significant: {p_value < 0.05})")`,
            output: `[STATS ENGINE] Loading dataset index array shapes (8, )
[STATS ENGINE] Calculating sum of squares residuals...

R-squared: 0.924
P-value: 0.00015 (Significant: True)
>> Reject Null Hypothesis (H0).
>> Variable Income shows a statistically significant positive relationship with variable Spending.`
        },
        git: {
            name: "Version Control (Git & GitHub)",
            level: "Proficiency: Expert (90%)",
            exp: "Branch workflows and release cycles",
            code: `# Git release flow commands
git checkout -b feature/etl-chatbot-rag
git add src/rag_agent.py tests/
git commit -m "feat(rag): integrate LangChain vector indexing loader"
git push origin feature/etl-chatbot-rag

# Perform conflict check & merge with main
git checkout main
git merge feature/etl-chatbot-rag --no-ff -m "Release v1.2.0"`,
            output: `[GIT] Switched to a new branch 'feature/etl-chatbot-rag'
[GIT] 3 files staged for commit.
[GIT] [feature/etl-chatbot-rag abc1234] feat(rag): integrate LangChain vector indexing loader
[GIT] Branch pushed successfully to GitHub repo origin.
Current version index: v1.2.0-stable | Sync complete.`
        }
    };

    const skillCatTabs = document.querySelectorAll('.skill-cat-tab');
    const skillListContainers = document.querySelectorAll('.skills-list-container');
    const skillPillCards = document.querySelectorAll('.skill-pill-card');
    
    const sandboxSkillName = document.getElementById('sandbox-skill-name');
    const sandboxSkillLevel = document.getElementById('sandbox-skill-level');
    const sandboxSkillExp = document.getElementById('sandbox-skill-exp');
    const sandboxCodeDisplay = document.getElementById('sandbox-code-display');
    const btnRunSandbox = document.getElementById('btn-run-sandbox');
    const sandboxCellOutput = document.getElementById('sandbox-cell-output');
    const sandboxConsoleOutput = document.getElementById('sandbox-console-output');

    let activeSkillKey = "genai";
    let isCodeExecuting = false;

    // Load active skill into playground console
    const loadSkillPlayground = (skillKey) => {
        if (!skillPlaygroundData[skillKey]) return;
        activeSkillKey = skillKey;
        const data = skillPlaygroundData[skillKey];
        
        // Update labels
        if (sandboxSkillName) sandboxSkillName.textContent = data.name;
        if (sandboxSkillLevel) sandboxSkillLevel.textContent = data.level;
        if (sandboxSkillExp) sandboxSkillExp.textContent = data.exp;
        
        // Update code
        if (sandboxCodeDisplay) {
            sandboxCodeDisplay.textContent = data.code;
        }

        // Reset output panel
        if (sandboxCellOutput) sandboxCellOutput.style.display = 'none';
        if (sandboxConsoleOutput) sandboxConsoleOutput.innerHTML = '';
        if (btnRunSandbox) {
            btnRunSandbox.disabled = false;
            btnRunSandbox.innerHTML = '<i class="fas fa-play"></i> Run Code Simulation';
            btnRunSandbox.classList.remove('running');
            btnRunSandbox.style.background = '';
        }
        isCodeExecuting = false;
    };

    // Category Selector tab switcher
    skillCatTabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            skillCatTabs.forEach(t => t.classList.remove('active'));
            e.currentTarget.classList.add('active');

            const cat = e.currentTarget.getAttribute('data-cat');
            skillListContainers.forEach(container => {
                container.classList.remove('active');
                if (container.id === `skills-list-${cat}`) {
                    container.classList.add('active');
                    
                    // Automatically load the first skill card of the new category
                    const firstCard = container.querySelector('.skill-pill-card');
                    if (firstCard) {
                        skillPillCards.forEach(c => c.classList.remove('active'));
                        firstCard.classList.add('active');
                        loadSkillPlayground(firstCard.getAttribute('data-skill'));
                    }
                }
            });
        });
    });

    // Skill card selection listener
    skillPillCards.forEach(card => {
        card.addEventListener('click', (e) => {
            skillPillCards.forEach(c => c.classList.remove('active'));
            e.currentTarget.classList.add('active');

            const skillKey = e.currentTarget.getAttribute('data-skill');
            loadSkillPlayground(skillKey);
        });
    });

    // Run code simulation click listener
    if (btnRunSandbox) {
        btnRunSandbox.addEventListener('click', () => {
            if (isCodeExecuting) return;
            isCodeExecuting = true;

            btnRunSandbox.disabled = true;
            btnRunSandbox.classList.add('running');
            btnRunSandbox.innerHTML = 'Running... <i class="fas fa-spinner fa-spin"></i>';

            // Show output cell
            if (sandboxCellOutput) sandboxCellOutput.style.display = 'grid';
            if (sandboxConsoleOutput) {
                sandboxConsoleOutput.innerHTML = '<span style="color:var(--text-muted)">Executing model script...</span>\n';
            }

            const data = skillPlaygroundData[activeSkillKey];
            const logs = data.output.split('\n');
            let logIndex = 0;

            const printNextLog = () => {
                if (logIndex === 0 && sandboxConsoleOutput) {
                    sandboxConsoleOutput.innerHTML = '';
                }
                
                if (logIndex < logs.length && sandboxConsoleOutput) {
                    const logLine = logs[logIndex];
                    const div = document.createElement('div');
                    
                    // Color formatting code
                    if (logLine.startsWith('[INFO]') || logLine.includes('Successfully')) {
                        div.style.color = '#34d399'; // Green success/info text
                    } else if (logLine.startsWith('>>') || logLine.startsWith('Verdict:')) {
                        div.style.color = '#f59e0b'; // Amber results text
                        div.style.fontWeight = 'bold';
                    } else if (logLine.startsWith('QUERY:') || logLine.startsWith('K-Means Centroids:') || logLine.startsWith('R-squared:')) {
                        div.style.color = 'white';
                        div.style.fontWeight = '600';
                    } else if (logLine.includes('Error') || logLine.includes('exception') || logLine.includes('failure')) {
                        div.style.color = '#f87171'; // Red error alert
                    } else {
                        div.style.color = '#a7f3d0'; // Default green terminal text
                    }

                    div.textContent = logLine;
                    sandboxConsoleOutput.appendChild(div);

                    // Scroll console output down
                    const sandboxContent = document.querySelector('.sandbox-content');
                    if (sandboxContent) {
                        sandboxContent.scrollTop = sandboxContent.scrollHeight;
                    }

                    logIndex++;
                    setTimeout(printNextLog, 300); // 300ms delay per line log
                } else {
                    // Complete execution
                    btnRunSandbox.innerHTML = '<i class="fas fa-check"></i> Run Completed';
                    btnRunSandbox.classList.remove('running');
                    btnRunSandbox.style.background = '#059669';
                    isCodeExecuting = false;
                }
            };

            setTimeout(printNextLog, 600); // Initial compiler compile latency simulation
        });
    }

    // Load initial default skill
    loadSkillPlayground('genai');

    // ==========================================
    // PORTFOLIO FILTERING
    // ==========================================
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Remove active class from all buttons and add to clicked
            filterButtons.forEach(button => button.classList.remove('active'));
            e.currentTarget.classList.add('active');

            const filterValue = e.currentTarget.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                // Reset card displays
                card.style.display = 'flex';
                // Trigger a slight opacity fade animation
                card.style.opacity = '0';
                card.style.transform = 'scale(0.85)';
                
                setTimeout(() => {
                    const categories = category.split(' ');
                    if (filterValue === 'all' || categories.includes(filterValue)) {
                        card.style.display = 'flex';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'scale(1)';
                        }, 50);
                    } else {
                        card.style.display = 'none';
                    }
                }, 200);
            });
        });
    });

    // ==========================================
    // SCROLL SPY ACTIVE NAV LINK
    // ==========================================
    const sections = document.querySelectorAll('section');

    const scrollSpy = () => {
        let currentSectionId = '';
        const scrollPosition = window.scrollY + 120; // Offset for fixed navbar height

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', scrollSpy);
    scrollSpy();

    // ==========================================
    // CONTACT FORM SUBMISSION HANDLER
    // ==========================================
    const contactForm = document.getElementById('contact-form');
    const formFeedback = document.getElementById('form-feedback');
    const submitBtn = document.getElementById('btn-submit');

    // To receive real email notifications, get a free Access Key from https://web3forms.com/
    // and replace "YOUR_ACCESS_KEY_HERE" with your key.
    const WEB3FORMS_ACCESS_KEY = "b82f9300-f67a-4662-9c4f-6b4d8cd9f485";

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Disable button and show spinner mockup
            submitBtn.disabled = true;
            const originalBtnHTML = submitBtn.innerHTML;
            submitBtn.innerHTML = 'Sending... <i class="fas fa-spinner fa-spin"></i>';

            // Extract form fields
            const name = document.getElementById('form-name').value;
            const email = document.getElementById('form-email').value;
            const subject = document.getElementById('form-subject').value;
            const message = document.getElementById('form-message').value;

            // Make sure the feedback element is visible
            formFeedback.style.display = 'block';

            if (WEB3FORMS_ACCESS_KEY === "YOUR_ACCESS_KEY_HERE" || !WEB3FORMS_ACCESS_KEY.trim()) {
                // Run Simulation Mode (Mock submission)
                setTimeout(() => {
                    formFeedback.textContent = `Thank you, ${name}! Your message has been sent successfully.`;
                    formFeedback.className = 'form-feedback success';
                    
                    // Clear inputs
                    contactForm.reset();
                    
                    // Restore button
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalBtnHTML;

                    // Scroll to feedback message
                    formFeedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

                    // Hide feedback after 5 seconds
                    setTimeout(() => {
                        formFeedback.style.display = 'none';
                    }, 5000);
                }, 1500);
            } else {
                // Real submission mode using Web3Forms API
                fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({
                        access_key: WEB3FORMS_ACCESS_KEY,
                        name: name,
                        email: email,
                        subject: subject,
                        message: message
                    })
                })
                .then(async (response) => {
                    let json = await response.json();
                    if (response.status == 200) {
                        formFeedback.textContent = `Thank you, ${name}! Your message has been sent successfully.`;
                        formFeedback.className = 'form-feedback success';
                        contactForm.reset();
                    } else {
                        console.log(response);
                        formFeedback.textContent = json.message || "Something went wrong. Please try again.";
                        formFeedback.className = 'form-feedback error';
                    }
                })
                .catch((error) => {
                    console.log(error);
                    formFeedback.textContent = "Unable to connect to server. Please check your internet connection.";
                    formFeedback.className = 'form-feedback error';
                })
                .then(() => {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalBtnHTML;
                    formFeedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                    setTimeout(() => {
                        formFeedback.style.display = 'none';
                    }, 6000);
                });
            }
        });
    }

    // ==========================================
    // BACK TO TOP BUTTON
    // ==========================================
    const backToTopBtn = document.getElementById('back-to-top');

    const handleBackToTopVisibility = () => {
        if (window.scrollY > 600) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    };

    window.addEventListener('scroll', handleBackToTopVisibility);
    handleBackToTopVisibility();

    // ==========================================
    // HERO MOUSE PARALLAX EFFECT
    // ==========================================
    const heroSection = document.getElementById('home');
    const floatingIcons = document.querySelectorAll('.floating-icon');
    const glowingSphere = document.querySelector('.glowing-sphere');

    if (heroSection) {
        heroSection.addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e;
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;
            
            const moveX = (clientX - centerX) / centerX;
            const moveY = (clientY - centerY) / centerY;

            floatingIcons.forEach((icon, index) => {
                const speed = (index + 1) * 12;
                icon.style.transform = `translate(${moveX * speed}px, ${moveY * speed}px)`;
            });

            if (glowingSphere) {
                glowingSphere.style.transform = `translate(${moveX * -15}px, ${moveY * -15}px)`;
            }
        });

        heroSection.addEventListener('mouseleave', () => {
            floatingIcons.forEach((icon) => {
                icon.style.transform = 'translate(0px, 0px)';
            });
            if (glowingSphere) {
                glowingSphere.style.transform = 'translate(0px, 0px)';
            }
        });
    }

    // ==========================================
    // INTERACTIVE TERMINAL SIMULATOR
    // ==========================================
    const terminalLines = document.getElementById('terminal-lines');
    const consoleBtns = document.querySelectorAll('.console-btn');

    const simulations = {
        pipeline: [
            "mounika@datascience-ops:~$ python run_pipeline.py --source SCMLite",
            "Initializing SCMLite pipeline ingestion...",
            "Connecting to Apache ZooKeeper (port 2181)... Connected.",
            "Connecting to Apache Kafka brokers (port 9092)... Connected.",
            "Streaming real-time shipment records...",
            "[SUCCESS] Ingested 14,820 records/sec.",
            "Verifying MongoDB collections schema... Schema validated.",
            "Pipeline status: ACTIVE [Docker Container: scmlite-ingestion-v1]"
        ],
        chatbot: [
            "mounika@datascience-ops:~$ python test_rag_agent.py --query 'ETL Job 104 Failure'",
            "Connecting to LLM orchestrator: LangChain v0.1.0...",
            "Connecting to PostgreSQL system logs database...",
            "Retrieving logs context from vector index... Context extracted.",
            "Injecting context to GPT-4 API endpoint...",
            "Generating error diagnostics...",
            ">> [FAILURE DETECTED] Row limit exceed in Transformation stage.",
            ">> [SUGGESTED RESOLUTION] Re-chunk log batch or increase max buffer to 256MB.",
            "Diagnostic completeness: 98% | Latency: 120ms"
        ],
        model: [
            "mounika@datascience-ops:~$ python train_forecaster.py --model LSTM --region Delhi",
            "Loading Delhi Power System historical consumption dataset...",
            "Scaling features using MinMaxScaler...",
            "Training LSTM (Long Short-Term Memory) forecasting model...",
            "Epoch 1/5 - Loss: 0.124  - Peak demand offset calibrated.",
            "Epoch 3/5 - Loss: 0.042",
            "Epoch 5/5 - Loss: 0.015",
            "[MODEL COMPLETED] Evaluated against baseline ARIMA and Prophet.",
            ">> Validation metrics: RMSE: 2.14 | R² Score: 0.941",
            ">> Peak evening load Duck Curve anomaly corrected."
        ]
    };

    let typingTimeout;

    const typeTerminal = (lines) => {
        clearTimeout(typingTimeout);
        
        if (!terminalLines) return;
        terminalLines.innerHTML = '';
        
        let lineIndex = 0;
        
        const printLine = () => {
            if (lineIndex < lines.length) {
                const p = document.createElement('p');
                p.className = 'terminal-line';
                const text = lines[lineIndex];
                
                if (text.startsWith("mounika@")) {
                    p.innerHTML = `<span class="terminal-prompt">${text.substring(0, text.indexOf('$') + 1)}</span>${text.substring(text.indexOf('$') + 1)}`;
                } else if (text.startsWith("[SUCCESS]") || text.startsWith(">>") || text.includes("SUCCESS")) {
                    p.innerHTML = `<span class="terminal-success">${text}</span>`;
                } else {
                    p.textContent = text;
                }
                
                terminalLines.appendChild(p);
                
                const terminalContainer = document.querySelector('.terminal-widget-content');
                if (terminalContainer) {
                    terminalContainer.scrollTop = terminalContainer.scrollHeight;
                }
                
                lineIndex++;
                const delay = text.startsWith("mounika@") ? 800 : 450;
                typingTimeout = setTimeout(printLine, delay);
            }
        };
        
        printLine();
    };

    consoleBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            consoleBtns.forEach(b => b.classList.remove('active'));
            e.currentTarget.classList.add('active');
            
            const simType = e.currentTarget.getAttribute('data-sim');
            if (simulations[simType]) {
                typeTerminal(simulations[simType]);
            }
        });
    });

    // Run default simulation on load
    const activeBtn = document.querySelector('.console-btn.active');
    if (activeBtn) {
        const initialSim = activeBtn.getAttribute('data-sim');
        if (simulations[initialSim]) {
            setTimeout(() => typeTerminal(simulations[initialSim]), 1500);
        }
    }

    // ==========================================
    // ABOUT TABS SWITCHER
    // ==========================================
    const tabBtns = document.querySelectorAll('.about-tab-btn');
    const tabPanels = document.querySelectorAll('.about-tab-panel');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            tabBtns.forEach(b => b.classList.remove('active'));
            tabPanels.forEach(p => p.classList.remove('active'));
            
            e.currentTarget.classList.add('active');
            const targetTab = e.currentTarget.getAttribute('data-tab');
            const activePanel = document.getElementById(`tab-panel-${targetTab}`);
            if (activePanel) {
                activePanel.classList.add('active');
            }
        });
    });

    // ==========================================
    // INTERACTIVE PARTICLE CANVAS BACKGROUND
    // ==========================================
    const canvas = document.getElementById('particle-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        let mouse = { x: null, y: null, radius: 150 };

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        window.addEventListener('mousemove', (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        });

        window.addEventListener('mouseout', () => {
            mouse.x = null;
            mouse.y = null;
        });

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.vx = (Math.random() - 0.5) * 0.5;
                this.vy = (Math.random() - 0.5) * 0.5;
                this.radius = Math.random() * 2 + 1;
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                if (this.x < 0 || this.x > canvas.width) this.vx = -this.vx;
                if (this.y < 0 || this.y > canvas.height) this.vy = -this.vy;

                if (mouse.x !== null && mouse.y !== null) {
                    const dx = mouse.x - this.x;
                    const dy = mouse.y - this.y;
                    const dist = Math.hypot(dx, dy);
                    if (dist < mouse.radius) {
                        const force = (mouse.radius - dist) / mouse.radius;
                        this.x -= (dx / dist) * force * 1.2;
                        this.y -= (dy / dist) * force * 1.2;
                    }
                }
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = document.body.classList.contains('light-theme') 
                    ? 'rgba(37, 99, 235, 0.2)' 
                    : 'rgba(168, 85, 247, 0.3)';
                ctx.fill();
            }
        }

        const initParticles = () => {
            const numParticles = Math.min(65, Math.floor((canvas.width * canvas.height) / 25000));
            particles = [];
            for (let i = 0; i < numParticles; i++) {
                particles.push(new Particle());
            }
        };
        initParticles();
        window.addEventListener('resize', initParticles);

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();

                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.hypot(dx, dy);

                    if (dist < 110) {
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        const opacity = ((110 - dist) / 110) * 0.12;
                        ctx.strokeStyle = document.body.classList.contains('light-theme') 
                            ? `rgba(37, 99, 235, ${opacity})` 
                            : `rgba(168, 85, 247, ${opacity})`;
                        ctx.lineWidth = 0.8;
                        ctx.stroke();
                    }
                }
                
                if (mouse.x !== null && mouse.y !== null) {
                    const dx = particles[i].x - mouse.x;
                    const dy = particles[i].y - mouse.y;
                    const dist = Math.hypot(dx, dy);
                    if (dist < mouse.radius) {
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(mouse.x, mouse.y);
                        const opacity = ((mouse.radius - dist) / mouse.radius) * 0.2;
                        ctx.strokeStyle = document.body.classList.contains('light-theme') 
                            ? `rgba(37, 99, 235, ${opacity})` 
                            : `rgba(168, 85, 247, ${opacity})`;
                        ctx.lineWidth = 0.8;
                        ctx.stroke();
                    }
                }
            }
            requestAnimationFrame(animate);
        };
        animate();
    }

    // ==========================================
    // 3D TILT EFFECT ON CARDS
    // ==========================================
    const tiltCards = document.querySelectorAll('.tilt-card');
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const xNorm = (x / rect.width) - 0.5;
            const yNorm = (y / rect.height) - 0.5;
            
            const tiltMax = 12; 
            const rotateX = -yNorm * tiltMax;
            const rotateY = xNorm * tiltMax;
            
            card.style.setProperty('--tilt-x', `${rotateX}deg`);
            card.style.setProperty('--tilt-y', `${rotateY}deg`);
            
            const glareX = (x / rect.width) * 100;
            const glareY = (y / rect.height) * 100;
            card.style.setProperty('--glare-x', `${glareX}%`);
            card.style.setProperty('--glare-y', `${glareY}%`);
            card.style.setProperty('--glare-opacity', '0.15');
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.setProperty('--tilt-x', '0deg');
            card.style.setProperty('--tilt-y', '0deg');
            card.style.setProperty('--glare-opacity', '0');
        });
    });

    // ==========================================
    // SCROLL REVEAL OBSERVER
    // ==========================================
    const revealItems = document.querySelectorAll('.reveal-item');
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const delay = entry.target.getAttribute('data-delay') || 0;
                setTimeout(() => {
                    entry.target.classList.add('active-reveal');
                }, delay);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.08,
        rootMargin: '0px 0px -40px 0px'
    });

    revealItems.forEach(item => revealObserver.observe(item));

    // ==========================================
    // 1. DELHI POWER DEMAND SVG INTERACTIVE GRAPH
    // ==========================================
    const powerWidget = document.getElementById('power-widget');
    if (powerWidget) {
        const svg = powerWidget.querySelector('.power-svg');
        const trackerLine = powerWidget.querySelector('.tracker-line');
        const trackerPoint = powerWidget.querySelector('.tracker-point');
        const tooltip = document.getElementById('power-tooltip');

        svg.addEventListener('mousemove', (e) => {
            const rect = svg.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Normalize X coordinate between 0 and 1
            const pctX = Math.max(0, Math.min(1, x / rect.width));
            
            // SVG viewBox width is 340, let's map coordinates
            const svgX = 30 + pctX * 300;
            
            // Generate mock load calculations representing the Duck Curve
            const hour = Math.floor(pctX * 24);
            const hourStr = hour.toString().padStart(2, '0') + ':00';
            
            // Duck Curve Math logic (dip at noon, peak at night)
            let loadValue;
            let solarValue = 0;
            
            // Peak evening load curve
            let baseLoad = 4800 + Math.sin((pctX * Math.PI * 2) - Math.PI / 2) * 1000;
            if (hour >= 7 && hour <= 17) {
                // Solar generation offsets grid demand during the day
                solarValue = Math.sin((hour - 7) / 10 * Math.PI) * 1800;
            }
            loadValue = Math.floor(baseLoad - solarValue);

            // Calculate matching Y height on grid line: viewBox height is 180
            // Mapping loadValue (3000 to 7000 MW) to Y coordinate (150 to 50)
            const minLoad = 2500;
            const maxLoad = 6800;
            const loadPct = (loadValue - minLoad) / (maxLoad - minLoad);
            const svgY = 150 - loadPct * 100;

            // Position tracker visual lines
            trackerLine.setAttribute('x1', svgX);
            trackerLine.setAttribute('x2', svgX);
            trackerLine.style.opacity = '1';
            
            trackerPoint.setAttribute('cx', svgX);
            trackerPoint.setAttribute('cy', svgY);
            trackerPoint.style.opacity = '1';

            // Show and update tooltip
            tooltip.style.opacity = '1';
            tooltip.style.left = `${x + 15}px`;
            tooltip.style.top = `${y - 45}px`;
            tooltip.querySelector('.time').textContent = `Time: ${hourStr}`;
            tooltip.querySelector('.load').innerHTML = `Demand: ${loadValue.toLocaleString()} MW <br><small style="color:var(--secondary-color)">Solar Gen: ${Math.floor(solarValue).toLocaleString()} MW</small>`;
        });

        svg.addEventListener('mouseleave', () => {
            trackerLine.style.opacity = '0';
            trackerPoint.style.opacity = '0';
            tooltip.style.opacity = '0';
        });
    }

    // ==========================================
    // 2. SMART NOTES INTERACTIVE WORKSPACE
    // ==========================================
    const notesWidget = document.getElementById('notes-widget');
    const notesWorkspace = document.getElementById('notes-workspace');
    const addNoteBtn = document.getElementById('add-note-btn');

    if (notesWidget && notesWorkspace && addNoteBtn) {
        // Drag note state
        let activeNote = null;
        let startX, startY, origLeft, origTop;

        const makeNoteDraggable = (note) => {
            note.addEventListener('mousedown', (e) => {
                // Ensure click didn't land on delete button or editable text
                if (e.target.closest('.delete-note-btn') || e.target.closest('.mini-note-body')) return;

                activeNote = note;
                startX = e.clientX;
                startY = e.clientY;
                origLeft = note.offsetLeft;
                origTop = note.offsetTop;
                note.style.zIndex = '100';
            });
        };

        // Initialize drag events on workspace
        notesWorkspace.addEventListener('mousemove', (e) => {
            if (!activeNote) return;
            const dx = e.clientX - startX;
            const dy = e.clientY - startY;

            // Keep notes bounded within workspace boundaries
            const maxLeft = notesWorkspace.clientWidth - activeNote.clientWidth - 10;
            const maxTop = notesWorkspace.clientHeight - activeNote.clientHeight - 10;
            
            const newLeft = Math.max(10, Math.min(maxLeft, origLeft + dx));
            const newTop = Math.max(36, Math.min(maxTop, origTop + dy)); // 36px header offset

            activeNote.style.left = `${newLeft}px`;
            activeNote.style.top = `${newTop}px`;
        });

        document.addEventListener('mouseup', () => {
            if (activeNote) {
                activeNote.style.zIndex = '10';
                activeNote = null;
            }
        });

        // Initialize existing notes
        const notesList = notesWorkspace.querySelectorAll('.mini-note');
        notesList.forEach(note => {
            makeNoteDraggable(note);
            note.querySelector('.delete-note-btn').addEventListener('click', () => note.remove());
        });

        // Add Note functionality
        const colors = [
            'rgba(59, 130, 246, 0.25)', // Blue
            'rgba(168, 85, 247, 0.25)', // Purple
            'rgba(0, 242, 254, 0.25)',  // Cyan
            'rgba(16, 185, 129, 0.25)'   // Green
        ];
        const borders = [
            'rgba(59, 130, 246, 0.4)',
            'rgba(168, 85, 247, 0.4)',
            'rgba(0, 242, 254, 0.4)',
            'rgba(16, 185, 129, 0.4)'
        ];

        addNoteBtn.addEventListener('click', () => {
            const randIdx = Math.floor(Math.random() * colors.length);
            const note = document.createElement('div');
            note.className = 'mini-note';
            
            // Random positioning inside bounds
            const randLeft = 10 + Math.random() * (notesWorkspace.clientWidth - 150);
            const randTop = 40 + Math.random() * (notesWorkspace.clientHeight - 110);
            
            note.style.left = `${randLeft}px`;
            note.style.top = `${randTop}px`;
            note.style.background = colors[randIdx];
            note.style.borderColor = borders[randIdx];
            
            note.innerHTML = `
                <div class="mini-note-header">
                    <span class="note-pin"></span>
                    <button class="delete-note-btn"><i class="fas fa-times"></i></button>
                </div>
                <div class="mini-note-body" contenteditable="true">Click to edit note...</div>
            `;
            
            notesWorkspace.appendChild(note);
            makeNoteDraggable(note);
            
            note.querySelector('.delete-note-btn').addEventListener('click', () => note.remove());
        });
    }

    // ==========================================
    // 3. CUSTOMER SEGMENTATION CLUSTERING GRAPH
    // ==========================================
    const segmentWidget = document.getElementById('segment-widget');
    if (segmentWidget) {
        const runKmeansBtn = document.getElementById('run-kmeans-btn');
        const clusterDots = segmentWidget.querySelectorAll('.cluster-dot');
        const centroids = segmentWidget.querySelectorAll('.centroid-marker');
        const tooltip = document.getElementById('segment-tooltip');
        
        let isClustered = false;
        
        const clusterCenters = {
            A: { x: 90, y: 45, color: '#3b82f6', label: 'Cluster A: High Loyalty & Spenders' },
            B: { x: 250, y: 115, color: '#a855f7', label: 'Cluster B: High Churn Risk (Inactive)' },
            C: { x: 163, y: 103, color: '#00f2fe', label: 'Cluster C: Value Seekers (Moderate Spend)' }
        };

        runKmeansBtn.addEventListener('click', () => {
            isClustered = !isClustered;
            
            if (isClustered) {
                runKmeansBtn.innerHTML = '<i class="fas fa-undo"></i> Reset Plot';
                
                // Show Centroids
                centroids.forEach(c => c.classList.add('active'));
                
                // Animate dots to cluster centers
                clusterDots.forEach(dot => {
                    const cluster = dot.getAttribute('data-cluster');
                    const center = clusterCenters[cluster];
                    
                    // Add slight variance to group dots around center rather than exact overlap
                    const varianceX = (Math.random() - 0.5) * 45;
                    const varianceY = (Math.random() - 0.5) * 45;
                    
                    const newX = center.x + varianceX;
                    const newY = center.y + varianceY;
                    
                    dot.style.transform = `translate(${newX - parseFloat(dot.getAttribute('cx'))}px, ${newY - parseFloat(dot.getAttribute('cy'))}px)`;
                    dot.style.fill = center.color;
                });
                
                tooltip.textContent = "K-Means analysis completed.";
            } else {
                runKmeansBtn.innerHTML = '<i class="fas fa-sync-alt"></i> Run K-Means';
                
                // Hide Centroids
                centroids.forEach(c => c.classList.remove('active'));
                
                // Reset dots to original coordinates
                clusterDots.forEach(dot => {
                    dot.style.transform = 'translate(0px, 0px)';
                    dot.style.fill = '#64748b';
                });
                
                tooltip.textContent = "Hover customer dot";
            }
        });

        // Add tooltips on dot hover
        clusterDots.forEach(dot => {
            dot.addEventListener('mouseenter', () => {
                dot.setAttribute('r', '7');
                if (isClustered) {
                    const cluster = dot.getAttribute('data-cluster');
                    tooltip.textContent = clusterCenters[cluster].label;
                    tooltip.style.color = clusterCenters[cluster].color;
                } else {
                    tooltip.textContent = `Raw Data Node (x: ${dot.getAttribute('cx')}, y: ${dot.getAttribute('cy')})`;
                    tooltip.style.color = 'var(--text-muted)';
                }
            });
            
            dot.addEventListener('mouseleave', () => {
                dot.setAttribute('r', '5');
                if (isClustered) {
                    tooltip.textContent = "K-Means analysis completed.";
                } else {
                    tooltip.textContent = "Hover customer dot";
                }
                tooltip.style.color = 'var(--text-muted)';
            });
        });
    }

    // ==========================================
    // 4. COVID-19 INTERACTIVE MINI DASHBOARD
    // ==========================================
    const covidWidget = document.getElementById('covid-widget');
    if (covidWidget) {
        const covidBtns = covidWidget.querySelectorAll('.covid-btn');
        const casesVal = document.getElementById('covid-cases');
        const deathsVal = document.getElementById('covid-deaths');
        
        const barCases = document.getElementById('bar-cases');
        const barDeaths = document.getElementById('bar-deaths');
        const barRecovered = document.getElementById('bar-recovered');

        const regionData = {
            global: { cases: "772M", deaths: "6.98M", cHeight: "90%", dHeight: "35%", rHeight: "75%", color: 'var(--primary-color)' },
            asia: { cases: "298M", deaths: "1.54M", cHeight: "60%", dHeight: "15%", rHeight: "85%", color: '#38bdf8' },
            europe: { cases: "272M", deaths: "2.22M", cHeight: "55%", dHeight: "25%", rHeight: "68%", color: '#ef4444' }
        };

        covidBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                covidBtns.forEach(b => b.classList.remove('active'));
                e.currentTarget.classList.add('active');

                const region = e.currentTarget.getAttribute('data-region');
                const data = regionData[region];

                // Animate numbers and chart bars
                casesVal.style.opacity = '0';
                deathsVal.style.opacity = '0';

                setTimeout(() => {
                    casesVal.textContent = data.cases;
                    deathsVal.textContent = data.deaths;
                    casesVal.style.color = data.color;
                    
                    casesVal.style.opacity = '1';
                    deathsVal.style.opacity = '1';
                }, 150);

                barCases.style.height = data.cHeight;
                barDeaths.style.height = data.dHeight;
                barRecovered.style.height = data.rHeight;
                
                barCases.style.background = data.color;
            });
        });
    }

    // ==========================================
    // 5. ATS RESUME SCORE CHECK WIDGET
    // ==========================================
    const atsWidget = document.getElementById('ats-widget');
    if (atsWidget) {
        const analyzeBtn = atsWidget.querySelector('#ats-analyze-btn');
        const ringFill = atsWidget.querySelector('#ats-ring-fill');
        const scoreText = atsWidget.querySelector('#ats-percentage');
        const suggestTag1 = atsWidget.querySelector('#suggest-tag-1');
        const suggestTag2 = atsWidget.querySelector('#suggest-tag-2');

        analyzeBtn.addEventListener('click', () => {
            if (analyzeBtn.classList.contains('running')) return;
            
            // Add loading states
            analyzeBtn.classList.add('running');
            analyzeBtn.innerHTML = '<i class="fas fa-sync-alt"></i> Parsing ATS Text...';
            
            // Reset state
            ringFill.style.strokeDashoffset = '251.2';
            scoreText.textContent = '--';
            suggestTag1.classList.remove('added');
            suggestTag2.classList.remove('added');
            
            // Simulate processing
            setTimeout(() => {
                analyzeBtn.innerHTML = '<i class="fas fa-search-plus"></i> Scoring Similarity...';
                
                setTimeout(() => {
                    // Final values
                    const targetScore = 88;
                    const maxOffset = 251.2;
                    const targetOffset = maxOffset - (maxOffset * targetScore / 100);
                    
                    // Animate ring
                    ringFill.style.strokeDashoffset = targetOffset;
                    
                    // Count up animation
                    let currentScore = 0;
                    const countInterval = setInterval(() => {
                        currentScore++;
                        scoreText.textContent = currentScore + '%';
                        if (currentScore >= targetScore) {
                            clearInterval(countInterval);
                            
                            // Highlight optimization suggestions as matched after scoring finishes
                            setTimeout(() => {
                                suggestTag1.classList.add('added');
                                setTimeout(() => {
                                    suggestTag2.classList.add('added');
                                    analyzeBtn.classList.remove('running');
                                    analyzeBtn.innerHTML = '<i class="fas fa-check-circle"></i> Resume Optimized!';
                                }, 300);
                            }, 400);
                        }
                    }, 12);
                }, 1000);
            }, 1200);
        });
    }
});
