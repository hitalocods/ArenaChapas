import { motion } from 'framer-motion';
import { modalities } from '../data/arenaData';
import { Section } from './ui/Section';

export function ModalitiesSection() {
  return (
    <Section
      id="modalidades"
      eyebrow="Modalidades"
      title="Esporte na areia com estrutura leve, moderna e completa."
      subtitle="Uma arena para quem quer competir, treinar ou encontrar os amigos em um ambiente sofisticado."
    >
      <div className="grid gap-4 md:grid-cols-3">
        {modalities.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              whileHover={{ y: -6 }}
              className="feature-card"
            >
              <span className="feature-icon">
                <Icon size={24} />
              </span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}
