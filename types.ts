
export interface Project {
  id: string;
  title: string;
  category: 'NLP' | 'Computer Vision' | 'Reinforcement Learning' | 'Predictive Analytics';
  description: string;
  tags: string[];
  metrics: { name: string; value: number; trend: 'up' | 'down' }[];
  image: string;
  githubUrl?: string;
  demoUrl?: string;
}

export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export interface ModelMetrics {
  epoch: number;
  loss: number;
  accuracy: number;
  val_loss: number;
  val_accuracy: number;
}
