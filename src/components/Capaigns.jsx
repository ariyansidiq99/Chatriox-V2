import { useState, useMemo, useCallback, memo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import useFetch    from '../hooks/useFetch';
import useDebounce from '../hooks/useDebounce';
import useToggle   from '../hooks/useToggle';
import { useNotify } from '../contexts/NotificationContext';
import { Card, CardBody, CardHeader, Badge, Button } from '../components/ui';

const CampaignCard = memo(function CampaignCard({ campaign }) {
  return (
    <Link to={`/campaigns/${campaign.id}`} className='campaign-link'>
      <Card className='campaign-card'>
        <CardHeader>
          <Badge variant={campaign.channel}>{campaign.channel}</Badge>
          <Badge variant={campaign.status}>{campaign.status}</Badge>
        </CardHeader>
        <CardBody>
          <h3 className='campaign-card__title'>{campaign.title}</h3>
          <div className='campaign-card__stats'>
            <span>{campaign.sent.toLocaleString()} sent</span>
            <span>{campaign.openRate}% open</span>
          </div>
        </CardBody>
      </Card>
    </Link>
  );
});

function Campaigns() {
  const notify = useNotify();
  const { data: raw, loading, error, refetch } =
    useFetch('https://jsonplaceholder.typicode.com/posts?_limit=20');
  const [search,       setSearch]       = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const [showSearch,   toggleSearch]    = useToggle(false);
  const debouncedSearch                 = useDebounce(search, 300);
  const channel = searchParams.get('channel') || 'all';

  const campaigns = useMemo(() => {
    if (!raw) return [];
    return raw.map((p, i) => ({
      ...p,
      channel:  i % 2 === 0 ? 'whatsapp' : 'email',
      sent:     1000 + i * 137,
      openRate: 60 + (i * 7) % 35,
      status:   ['active','completed','draft'][i % 3],
    }));
  }, [raw]);

  const filtered = useMemo(() => campaigns
    .filter(c => channel === 'all' || c.channel === channel)
    .filter(c => !debouncedSearch || c.title.toLowerCase().includes(debouncedSearch.toLowerCase()))
  , [campaigns, channel, debouncedSearch]);

  const handleRefetch = useCallback(() => {
    refetch();
    notify.info('Refreshing campaigns...');
  }, [refetch, notify]);

  if (loading) return <div className='page-loading'><div className='spinner'/></div>;
  if (error)   return (
    <div className='error-state container'>
      <p>Failed to load campaigns: {error}</p>
      <Button onClick={handleRefetch}>Try Again</Button>
    </div>
  );

  return (
    <div className='campaigns-page container'>
      <div className='page-header'>
        <h1>Campaigns</h1>
        <div className='page-header__actions'>
          <Button variant='outline' size='sm' onClick={toggleSearch}>
            {showSearch ? 'Hide Search' : 'Search'}
          </Button>
          <Button variant='outline' size='sm' onClick={handleRefetch}>Refresh</Button>
        </div>
      </div>
      {showSearch && (
        <input className='search-input' value={search}
          onChange={e => setSearch(e.target.value)} placeholder='Search campaigns...' autoFocus />
      )}
      <div className='filters'>
        {['all','whatsapp','email'].map(f => (
          <button key={f}
            className={`filter-btn ${channel === f ? 'is-active' : ''}`}
            onClick={() => setSearchParams(f === 'all' ? {} : { channel: f })}
          >
            {f === 'all' ? 'All' : f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>
      <p className='results-count'>{filtered.length} campaigns</p>
      <div className='campaigns-grid'>
        {filtered.map(c => <CampaignCard key={c.id} campaign={c} />)}
      </div>
    </div>
  );
}

export default Campaigns;
import { useState, useMemo, useCallback, memo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import useFetch    from '../hooks/useFetch';
import useDebounce from '../hooks/useDebounce';
import useToggle   from '../hooks/useToggle';
import { useNotify } from '../contexts/NotificationContext';
import { Card, CardBody, CardHeader, Badge, Button } from '../components/ui';

const CampaignCard = memo(function CampaignCard({ campaign }) {
  return (
    <Link to={`/campaigns/${campaign.id}`} className='campaign-link'>
      <Card className='campaign-card'>
        <CardHeader>
          <Badge variant={campaign.channel}>{campaign.channel}</Badge>
          <Badge variant={campaign.status}>{campaign.status}</Badge>
        </CardHeader>
        <CardBody>
          <h3 className='campaign-card__title'>{campaign.title}</h3>
          <div className='campaign-card__stats'>
            <span>{campaign.sent.toLocaleString()} sent</span>
            <span>{campaign.openRate}% open</span>
          </div>
        </CardBody>
      </Card>
    </Link>
  );
});

function Campaigns() {
  const notify = useNotify();
  const { data: raw, loading, error, refetch } =
    useFetch('https://jsonplaceholder.typicode.com/posts?_limit=20');
  const [search,       setSearch]       = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const [showSearch,   toggleSearch]    = useToggle(false);
  const debouncedSearch                 = useDebounce(search, 300);
  const channel = searchParams.get('channel') || 'all';

  const campaigns = useMemo(() => {
    if (!raw) return [];
    return raw.map((p, i) => ({
      ...p,
      channel:  i % 2 === 0 ? 'whatsapp' : 'email',
      sent:     1000 + i * 137,
      openRate: 60 + (i * 7) % 35,
      status:   ['active','completed','draft'][i % 3],
    }));
  }, [raw]);

  const filtered = useMemo(() => campaigns
    .filter(c => channel === 'all' || c.channel === channel)
    .filter(c => !debouncedSearch || c.title.toLowerCase().includes(debouncedSearch.toLowerCase()))
  , [campaigns, channel, debouncedSearch]);

  const handleRefetch = useCallback(() => {
    refetch();
    notify.info('Refreshing campaigns...');
  }, [refetch, notify]);

  if (loading) return <div className='page-loading'><div className='spinner'/></div>;
  if (error)   return (
    <div className='error-state container'>
      <p>Failed to load campaigns: {error}</p>
      <Button onClick={handleRefetch}>Try Again</Button>
    </div>
  );

  return (
    <div className='campaigns-page container'>
      <div className='page-header'>
        <h1>Campaigns</h1>
        <div className='page-header__actions'>
          <Button variant='outline' size='sm' onClick={toggleSearch}>
            {showSearch ? 'Hide Search' : 'Search'}
          </Button>
          <Button variant='outline' size='sm' onClick={handleRefetch}>Refresh</Button>
        </div>
      </div>
      {showSearch && (
        <input className='search-input' value={search}
          onChange={e => setSearch(e.target.value)} placeholder='Search campaigns...' autoFocus />
      )}
      <div className='filters'>
        {['all','whatsapp','email'].map(f => (
          <button key={f}
            className={`filter-btn ${channel === f ? 'is-active' : ''}`}
            onClick={() => setSearchParams(f === 'all' ? {} : { channel: f })}
          >
            {f === 'all' ? 'All' : f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>
      <p className='results-count'>{filtered.length} campaigns</p>
      <div className='campaigns-grid'>
        {filtered.map(c => <CampaignCard key={c.id} campaign={c} />)}
      </div>
    </div>
  );
}

export default Campaigns;
