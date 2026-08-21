// The portfolio page is content. One entry per experience, ordered most recent
// first.
//
// `accent` is the organisation's own brand colour. It draws the notch beside
// the mark, the outlines of the stack tags and the wash the row takes on hover,
// so it needs enough saturation to hold up against the black canvas. Four of
// the six are a red of some kind, so the accent alone cannot tell the rows
// apart: the mark is what carries each identity, and the accent reinforces it.
//
// Rapyuta's mark is filled black, which is invisible here, so it is drawn from
// a variant whose fill has been lifted to white.

import tesla from '../components/portfolio/tesla.png'
import rapyuta from '../components/portfolio/rapyuta-light.png'
import gtri from '../components/portfolio/gtri.png'
import mitre from '../components/portfolio/mitre.png'
import grt from '../components/portfolio/grt.png'
import kurio from '../components/portfolio/kurio.png'

export const experiences = [
    {
        name: 'Tesla',
        role: 'Computer Vision & Data',
        logo: tesla,
        accent: '#e82127',
        years: '',
        stack: ['AWS S3', 'SQL', 'Kafka', 'Kubernetes', 'C#/.NET'],
    },
    {
        name: 'Rapyuta Robotics',
        role: 'Robotics Perception & Systems',
        logo: rapyuta,
        accent: '#e2231a',
        years: '',
        stack: [
            'Python',
            'PyTorch',
            'GStreamer',
            'OpenCV',
            'TensorRT',
            'Transformer Object Detection',
            'ROS/ROS 2',
            'C++',
            'Docker Compose',
            'Linux',
            'Networking',
            'Ansible',
            'Grafana',
        ],
    },
    {
        name: 'Georgia Tech Research Institute',
        role: 'Robotics Simulation',
        logo: gtri,
        accent: '#b3a369',
        years: '',
        stack: ['ROS', 'catkin', 'Gazebo', 'SLAM'],
    },
    {
        name: 'MITRE Corporation',
        role: 'Deep Learning Research',
        logo: mitre,
        accent: '#005b94',
        years: '',
        stack: ['Cybersecurity', 'Computer Vision', 'Generative Adversarial Networks'],
    },
    {
        name: 'Gunn Robotics Team',
        role: 'Controls Team Lead',
        logo: grt,
        accent: '#ed1c24',
        years: '',
        stack: [
            'Jetson Nano',
            'GStreamer H.264 streaming',
            'Electronics',
            'Soldering',
            'Java',
            'Recruiting & Mentorship',
            'Design/Systems Integration',
            'Logistics & Purchasing & Coordination',
        ],
    },
    {
        name: 'Kuriosity Robotics',
        role: 'Software Team Lead',
        logo: kurio,
        accent: '#ef2b2d',
        years: '',
        stack: [
            'Multi-threaded software architecture',
            'SLAM',
            'Kalman Filter Sensor Fusion',
            'Path Planning',
            'Control Systems',
            'TensorFlow',
            'Java',
            'Mentorship & Leadership',
        ],
    },
]
