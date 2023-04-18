import { Spin } from 'antd'

export const Loading = () => {
  return (
    <div style={{ height: '100%', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Spin size="large" />
    </div>
  )
}
