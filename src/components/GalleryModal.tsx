import { motion } from 'framer-motion';
import { X, Layers, ArrowRight } from 'lucide-react';
import { sampleOntologies, categoryColors } from '../data/sampleOntologies';
import { useAppStore } from '../store/appStore';

interface GalleryModalProps {
  onClose: () => void;
}

export function GalleryModal({ onClose }: GalleryModalProps) {
  const { currentOntology, loadOntology } = useAppStore();

  const handleLoadOntology = (entry: typeof sampleOntologies[0]) => {
    loadOntology(entry.ontology, entry.bindings);
    onClose();
  };

  return (
    <motion.div
      className="modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="modal-content"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: 'spring', damping: 20 }}
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: 800, maxHeight: '85vh', overflow: 'auto' }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <div>
            <h2 style={{ fontSize: 24, fontWeight: 600 }}>Ontology Gallery</h2>
            <p style={{ fontSize: 14, color: 'var(--text-secondary)', marginTop: 4 }}>
              Pre-built ontologies for common business domains
            </p>
          </div>
          <button className="icon-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Gallery Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 16 }}>
          {sampleOntologies.map((entry) => {
            const isActive = currentOntology.name === entry.ontology.name;
            const categoryColor = categoryColors[entry.category];
            
            return (
              <motion.div
                key={entry.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  padding: 20,
                  background: isActive 
                    ? 'linear-gradient(135deg, rgba(0, 120, 212, 0.15), rgba(0, 120, 212, 0.05))'
                    : 'var(--bg-tertiary)',
                  borderRadius: 'var(--radius-lg)',
                  border: isActive ? '2px solid var(--ms-blue)' : '2px solid transparent',
                  cursor: isActive ? 'default' : 'pointer',
                  transition: 'border-color 0.2s, background 0.2s'
                }}
                onClick={() => !isActive && handleLoadOntology(entry)}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{
                      width: 48,
                      height: 48,
                      background: `${categoryColor}20`,
                      borderRadius: 'var(--radius-md)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 24
                    }}>
                      {entry.icon}
                    </div>
                    <div>
                      <div style={{ fontSize: 16, fontWeight: 600 }}>{entry.name}</div>
                      <div style={{ 
                        fontSize: 11, 
                        color: categoryColor,
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px'
                      }}>
                        {entry.category}
                      </div>
                    </div>
                  </div>
                  {isActive && (
                    <div style={{
                      padding: '4px 8px',
                      background: 'var(--ms-blue)',
                      color: 'white',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: 11,
                      fontWeight: 600
                    }}>
                      Active
                    </div>
                  )}
                </div>

                <p style={{ 
                  fontSize: 13, 
                  color: 'var(--text-secondary)', 
                  marginBottom: 16,
                  lineHeight: 1.5
                }}>
                  {entry.description}
                </p>

                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  padding: '12px 0 0',
                  borderTop: '1px solid var(--border-primary)'
                }}>
                  <div style={{ display: 'flex', gap: 16 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <Layers size={14} color="var(--text-tertiary)" />
                      <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
                        {entry.ontology.entityTypes.length} entities
                      </span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <ArrowRight size={14} color="var(--text-tertiary)" />
                      <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
                        {entry.ontology.relationships.length} relationships
                      </span>
                    </div>
                  </div>
                  
                  {!isActive && (
                    <button 
                      className="btn btn-secondary" 
                      style={{ padding: '6px 12px', fontSize: 12 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleLoadOntology(entry);
                      }}
                    >
                      Load
                    </button>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        <div style={{ 
          marginTop: 24, 
          padding: 16, 
          background: 'var(--bg-tertiary)', 
          borderRadius: 'var(--radius-md)',
          textAlign: 'center'
        }}>
          <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
            Have your own ontology? Use the <strong>Import / Export</strong> feature to load custom JSON ontologies.
          </p>
        </div>

        <div style={{ marginTop: 20, textAlign: 'center' }}>
          <button className="btn btn-primary" onClick={onClose}>
            Done
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
