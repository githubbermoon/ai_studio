
import React from 'react';
import { Project, ModelMetrics } from './types';

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'SentientStream NLP',
    category: 'NLP',
    description: 'A real-time sentiment analysis engine optimized for financial news feeds using Transformer-based architectures.',
    tags: ['BERT', 'PyTorch', 'Kafka', 'FastAPI'],
    metrics: [
      { name: 'Accuracy', value: 94.2, trend: 'up' },
      { name: 'Latency', value: 12, trend: 'down' }
    ],
    image: 'https://picsum.photos/seed/nlp1/800/600',
    githubUrl: 'https://github.com/githubbermoon/ml-portfolio'
  },
  {
    id: '2',
    title: 'OcuGuard Vision',
    category: 'Computer Vision',
    description: 'Advanced edge-computing object detection system for industrial safety monitoring and PPE compliance.',
    tags: ['YOLOv8', 'TensorRT', 'C++', 'OpenCV'],
    metrics: [
      { name: 'mAP', value: 89.5, trend: 'up' },
      { name: 'FPS', value: 60, trend: 'up' }
    ],
    image: 'https://picsum.photos/seed/cv1/800/600',
    githubUrl: 'https://github.com/githubbermoon/ml-portfolio'
  },
  {
    id: '3',
    title: 'NexusRL Trader',
    category: 'Reinforcement Learning',
    description: 'A deep reinforcement learning agent designed for multi-asset portfolio optimization and market making.',
    tags: ['PPO', 'StableBaselines3', 'Gymnasium', 'Pandas'],
    metrics: [
      { name: 'Sharpe Ratio', value: 2.1, trend: 'up' },
      { name: 'Drawdown', value: 4.2, trend: 'down' }
    ],
    image: 'https://picsum.photos/seed/rl1/800/600',
    githubUrl: 'https://github.com/githubbermoon/ml-portfolio'
  }
];

export const MOCK_TRAINING_DATA: ModelMetrics[] = Array.from({ length: 20 }, (_, i) => ({
  epoch: i + 1,
  loss: 0.8 / (i + 1) + Math.random() * 0.05,
  accuracy: 0.6 + (0.35 * (i / 19)) + Math.random() * 0.02,
  val_loss: 0.85 / (i + 1) + Math.random() * 0.08,
  val_accuracy: 0.58 + (0.32 * (i / 19)) + Math.random() * 0.03,
}));

export const CATEGORIES = ['All', 'NLP', 'Computer Vision', 'Reinforcement Learning', 'Predictive Analytics'];
