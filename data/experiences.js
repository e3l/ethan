// One entry per experience, ordered most recent first. The portfolio, the home
// gallery and, eventually, a page per experience all read from the same entry.
//
// `slug` names the experience in URLs. The portfolio uses it as each row's
// anchor, so `/portfolio#tesla` lands on Tesla's row.
//
// `accent` is the organisation's own brand colour, used only as a highlight.
//
// `blurb` (an array of paragraphs) and `photos` (an array of imported images)
// belong to the portfolio: what the work was, and pictures of the tech itself.
//
// `favorites` (an array of imported images) belong to the home gallery: the
// photos from that era worth showing for their own sake, whether or not they
// show the work. An experience without any is left out of the gallery.
//
// Rapyuta's mark is filled black, which is invisible here, so it is drawn from
// a variant whose fill has been lifted to white.

import tesla from '../components/portfolio/tesla.png'
import rapyuta from '../components/portfolio/rapyuta-light.png'
import gtri from '../components/portfolio/gtri.png'
import mitre from '../components/portfolio/mitre.png'
import grt from '../components/portfolio/grt.png'
import kurio from '../components/portfolio/kurio.png'

import tesla_a from '../components/gallery/tesla/a.png'
import tesla_b from '../components/gallery/tesla/b.png'
import tesla_c from '../components/gallery/tesla/c.png'
import tesla_d from '../components/gallery/tesla/d.png'
import tesla_e from '../components/gallery/tesla/e.png'
import tesla_f from '../components/gallery/tesla/f.jpg'
import tesla_g from '../components/gallery/tesla/g.jpg'
import tesla_h from '../components/gallery/tesla/h.png'

import rapyuta_a from '../components/gallery/rapyuta/a.png'
import rapyuta_b from '../components/gallery/rapyuta/b.png'
import rapyuta_c from '../components/gallery/rapyuta/c.png'
import rapyuta_d from '../components/gallery/rapyuta/d.png'
import rapyuta_e from '../components/gallery/rapyuta/e.jpg'
import rapyuta_f from '../components/gallery/rapyuta/f.png'
import rapyuta_g from '../components/gallery/rapyuta/g.png'
import rapyuta_h from '../components/gallery/rapyuta/h.png'
import rapyuta_i from '../components/gallery/rapyuta/i.png'
import rapyuta_j from '../components/gallery/rapyuta/j.png'
import rapyuta_k from '../components/gallery/rapyuta/k.png'
import rapyuta_l from '../components/gallery/rapyuta/l.png'
import rapyuta_m from '../components/gallery/rapyuta/m.jpg'
import rapyuta_n from '../components/gallery/rapyuta/n.png'
import rapyuta_o from '../components/gallery/rapyuta/o.png'
import rapyuta_p from '../components/gallery/rapyuta/p.png'
import rapyuta_q from '../components/gallery/rapyuta/q.png'

import grt_a from '../components/gallery/grt/a.png'
import grt_b from '../components/gallery/grt/b.png'
import grt_c from '../components/gallery/grt/c.png'
import grt_d from '../components/gallery/grt/d.png'
import grt_e from '../components/gallery/grt/e.png'
import grt_f from '../components/gallery/grt/f.png'
import grt_g from '../components/gallery/grt/g.png'

import kurio_a from '../components/gallery/kurio/a.png'
import kurio_b from '../components/gallery/kurio/b.png'
import kurio_c from '../components/gallery/kurio/c.png'
import kurio_d from '../components/gallery/kurio/d.png'
import kurio_e from '../components/gallery/kurio/e.png'
import kurio_f from '../components/gallery/kurio/f.png'
import kurio_g from '../components/gallery/kurio/g.png'

export const experiences = [
    {
        slug: 'tesla',
        name: 'Tesla',
        role: 'Computer Vision & Data',
        logo: tesla,
        accent: '#e82127',
        years: '',
        stack: ['AWS S3', 'SQL', 'Kafka', 'Kubernetes', 'C#/.NET'],
        favorites: [tesla_a, tesla_b, tesla_c, tesla_d, tesla_e, tesla_g, tesla_h, tesla_f],
    },
    {
        slug: 'rapyuta',
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
        favorites: [
            rapyuta_a, rapyuta_b, rapyuta_c, rapyuta_d, rapyuta_e, rapyuta_f,
            rapyuta_g, rapyuta_h, rapyuta_i, rapyuta_j, rapyuta_k, rapyuta_l,
            rapyuta_m, rapyuta_n, rapyuta_o, rapyuta_p, rapyuta_q,
        ],
    },
    {
        slug: 'gtri',
        name: 'Georgia Tech Research Institute',
        role: 'Robotics Simulation',
        logo: gtri,
        accent: '#b3a369',
        years: '',
        stack: ['ROS', 'catkin', 'Gazebo', 'SLAM'],
    },
    {
        slug: 'mitre',
        name: 'MITRE Corporation',
        role: 'Deep Learning Research',
        logo: mitre,
        accent: '#005b94',
        years: '',
        stack: ['Cybersecurity', 'Computer Vision', 'Generative Adversarial Networks'],
    },
    {
        slug: 'grt',
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
        favorites: [grt_a, grt_b, grt_c, grt_d, grt_e, grt_f, grt_g],
    },
    {
        slug: 'kurio',
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
        favorites: [kurio_a, kurio_b, kurio_c, kurio_d, kurio_e, kurio_f, kurio_g],
    },
]
