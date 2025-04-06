'use client';

import type { ChangeEvent } from 'react';
import { useCallback, useState } from 'react';

import {
  Button,
  FieldDescription,
  FieldError,
  FieldLabel,
  TextInput,
  useAllFormFields,
  useField,
  useForm,
} from '@payloadcms/ui';
import type { TextFieldClientComponent, TextFieldClientProps } from 'payload';

import type { UrlMetadataResponse } from '@/payload/endpoints/url-metadata';

export const UrlMetadata: TextFieldClientComponent = ({ field, path }: TextFieldClientProps) => {
  const { setModified } = useForm();
  const { value, setValue, errorMessage } = useField<string>({ path });
  const [, dispatchFields] = useAllFormFields();

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchMetadata = useCallback(async () => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/url-metadata', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: value }),
      });

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const data = await response.json();

      if (!response.ok) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
        setError(data.error || 'Failed to fetch metadata');
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
        throw new Error(data.error || 'Failed to fetch metadata');
      }

      const metadata = data as UrlMetadataResponse;

      if (metadata.title) {
        dispatchFields({
          type: 'UPDATE',
          path: 'urlMetadata.title',
          value: metadata.title,
        });
        setModified(true);
      }

      if (metadata.description) {
        dispatchFields({
          type: 'UPDATE',
          path: 'urlMetadata.description',
          value: metadata.description,
        });
        setModified(true);
      }

      if (metadata.image) {
        dispatchFields({
          type: 'UPDATE',
          path: 'urlMetadata.image',
          value: metadata.image,
        });
        setModified(true);
      }

      if (metadata.published) {
        dispatchFields({
          type: 'UPDATE',
          path: 'urlMetadata.published',
          value: metadata.published,
        });
        const publishedDate = new Date(metadata.published);

        if (publishedDate.toString() !== 'Invalid Date') {
          dispatchFields({
            type: 'UPDATE',
            path: 'published',
            value: publishedDate,
          });
        }

        setModified(true);
      }

      if (metadata.site) {
        dispatchFields({
          type: 'UPDATE',
          path: 'urlMetadata.site',
          value: metadata.site,
        });
        setModified(true);
      }
    } catch (err) {
      console.error('Metadata fetch error:', err);
      setError('Failed to fetch metadata');
    } finally {
      setLoading(false);
    }
  }, [value, dispatchFields]);

  const handleOnChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    setModified(true);
  }, []);

  return (
    <div className="field-with-button">
      <TextInput
        Error={<FieldError message={error || errorMessage} showError={!!error || !!errorMessage} />}
        Label={
          <FieldLabel label={field?.label || field?.name} path={path} required={field?.required} />
        }
        Description={<FieldDescription path={path} description={field?.admin?.description} />}
        onChange={handleOnChange}
        path={path}
        showError={!!error || !!errorMessage}
        value={value}
        style={{ width: '100%' }}
      />
      <Button onClick={() => void fetchMetadata()} disabled={loading}>
        Fetch metadata
      </Button>
    </div>
  );
};
