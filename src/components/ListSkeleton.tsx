// ListSkeleton.tsx
import React from 'react';
import {
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonSkeletonText,
} from '@ionic/react';

const ListSkeleton: React.FC = () => {
  const skeletonItems = Array.from({ length: 12});

  return (
    <IonGrid>
      <IonRow>
        {skeletonItems.map((_, index) => (
          <IonCol size="12" size-md="6" size-lg="4" key={index}>
            <IonCard style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <IonCardHeader>
                <IonCardTitle>
                  <IonSkeletonText animated style={{ width: '60%' }} />
                </IonCardTitle>
              </IonCardHeader>
              <IonCardContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <IonSkeletonText animated style={{ width: '100px', height: '100px' }} />
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <IonSkeletonText animated style={{ width: '30px', marginTop: '8px' }} />
                  <IonSkeletonText animated style={{ width: '80px', marginTop: '8px' }} />
                </div>
                <IonSkeletonText animated style={{ width: '60%', marginTop: '12px' }} />
              </IonCardContent>
            </IonCard>
          </IonCol>
        ))}
      </IonRow>
    </IonGrid>
  );
};

export default ListSkeleton;