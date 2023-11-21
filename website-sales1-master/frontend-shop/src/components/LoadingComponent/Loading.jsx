import { Spin } from 'antd'
import React from 'react'

const Loading = ({ children, isLoading, delay ,wrapperClassName }) => {
    
    return (
        <Spin spinning={isLoading} delay={delay} wrapperClassName={wrapperClassName} >
            {children}
        </Spin>
    )
}

export default Loading